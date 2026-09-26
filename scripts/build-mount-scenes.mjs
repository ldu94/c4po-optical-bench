// Generate exact preview geometry from evaluated c4po CSG. Keep vendor meshes
// separate from procedural geometry so non-watertight vendor STLs remain usable.
import {createOpenSCAD} from '../vendor/openscad/openscad.js';
import {catalog,cadFiles,cadCall} from '../model.js';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const identity=()=>[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const mul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((sum,v,k)=>sum+v*b[k][j],0)));
async function engine(){const logs=[],api=await createOpenSCAD({print:t=>logs.push(t),printErr:t=>logs.push(t)}),oc=api.getInstance();for(const f of cadFiles)oc.FS.writeFile('/'+f,await readFile(new URL('../cad/'+f,import.meta.url)));return {oc,logs};}
function parse(source){const root={name:'group',line:'group() {',children:[]},stack=[root];for(const raw of source.split('\n')){const line=raw.trim();if(!line)continue;if(line==='}'){stack.pop();continue;}const node={name:line.match(/^\w+/)?.[0],line,children:[]};stack.at(-1).children.push(node);if(line.endsWith('{'))stack.push(node);}assert.equal(stack.length,1);return root;}
function hasImport(n){return n.name==='import'||n.children.some(hasImport);}
function serialize(n){if(n.name==='import')return 'group();';return n.line+(n.line.endsWith('{')?'\n'+n.children.map(serialize).join('\n')+'\n}':'');}
function collect(n,m,items){if(n.name==='multmatrix')m=mul(m,JSON.parse(n.line.slice(11,n.line.lastIndexOf(')'))));if(n.name==='difference'||n.name==='intersection'){assert.ok(!hasImport(n),`Imported hardware inside ${n.name} needs an explicit preview adapter.`);return;}if(n.name==='import'){const file=JSON.parse(n.line.match(/file = ("[^"]+")/)[1]).replace(/^\//,'');items.push({kind:'stl',file,matrix:m});}else n.children.forEach(c=>collect(c,m,items));}
await mkdir(new URL('../cad/generated/',import.meta.url),{recursive:true});
const output={};
for(const part of catalog){
 const {oc,logs}=await engine();oc.FS.writeFile('/input.scad',`use <c4po-web.scad>; $fn=48; ${cadCall(part,String(part.previewDz??0),'true','false')}`);
 assert.equal(oc.callMain(['/input.scad','-o','/mount.csg']),0);
 assert.ok(!logs.some(l=>/^(WARNING|ERROR):/.test(l)),`${part.id}: ${logs.join('\n')}`);
 const tree=parse(oc.FS.readFile('/mount.csg',{encoding:'utf8'})),items=[];collect(tree,identity(),items);
 for(const item of items)await stat(new URL('../cad/'+item.file,import.meta.url));
 const procedural=serialize(tree);
 if(/\b(cube|cylinder|sphere|polyhedron|linear_extrude|rotate_extrude)\(/.test(procedural)){
  const {oc:geo,logs:geoLogs}=await engine();geo.FS.writeFile('/geometry.scad',procedural);const code=geo.callMain(['/geometry.scad','-o','/geometry.stl']);
  if(!geoLogs.some(l=>/Current top level object is empty/.test(l))){assert.equal(code,0,`${part.id}: ${geoLogs.join('\n')}`);assert.ok(!geoLogs.some(l=>/^ERROR:/.test(l)),geoLogs.join('\n'));const bytes=geo.FS.readFile('/geometry.stl'),file=`generated/${part.id}.stl`;await writeFile(new URL('../cad/'+file,import.meta.url),bytes);items.push({kind:'stl',file,matrix:identity(),procedural:true});}
 }
 assert.ok(items.length,`No preview geometry for ${part.id}`);output[part.id]=items;console.log(`${part.id}: ${items.length} mesh(es)`);
}
await writeFile(new URL('../cad/mount-scenes.json',import.meta.url),JSON.stringify(output,null,2)+'\n');console.log(`Extracted exact hardware transforms for ${catalog.length} assemblies.`);
