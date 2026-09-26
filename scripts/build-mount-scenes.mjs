// Extract hardware placements from OpenSCAD's evaluated CSG, not hand-maintained transforms.
// dz=0 suppresses generated posts; this catalog only supports recessed mounting.
import {createOpenSCAD} from '../vendor/openscad/openscad.js';
import {catalog} from '../model.js';
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const identity=()=>[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const mul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((sum,v,k)=>sum+v*b[k][j],0)));
const output={};
for(const part of catalog){
 const api=await createOpenSCAD({print:()=>{},printErr:()=>{}}),oc=api.getInstance();
 for(const f of ['thorlabs_optomech.scad','util.scad'])oc.FS.writeFile('/'+f,await readFile(new URL('../cad/'+f,import.meta.url)));
 oc.FS.writeFile('/input.scad',`use <thorlabs_optomech.scad>; show=true; ${part.module}(dz=0,show=true,drill=false,${part.args});`);
 assert.equal(oc.callMain(['/input.scad','-o','/mount.csg']),0);
 const lines=oc.FS.readFile('/mount.csg',{encoding:'utf8'}).split('\n'),stack=[identity()],items=[];
 for(const raw of lines){const line=raw.trim();if(line==='}'){stack.pop();continue;}if(line.endsWith('{')){let matrix=stack.at(-1);if(line.startsWith('multmatrix('))matrix=mul(matrix,JSON.parse(line.slice(11,line.lastIndexOf(')'))));stack.push(matrix);continue;}
  if(line.startsWith('import(')){const file=JSON.parse(line.match(/file = ("[^"]+")/)[1]).replace(/^\//,'');items.push({kind:'stl',file,matrix:stack.at(-1)});}
  else if(line.startsWith('cylinder(')){const params=Object.fromEntries([...line.matchAll(/(h|r1|r2|center) = ([^,)]+)/g)].map(m=>[m[1],JSON.parse(m[2])]));items.push({kind:'cylinder',...params,matrix:stack.at(-1)});}
  else if(line&& !/^(group|color)\(.*\);$/.test(line))throw Error(`Unsupported hardware CSG in ${part.id}: ${line}`);
 }
 assert.equal(items.filter(i=>i.kind==='stl').length,1,part.id);assert.equal(stack.length,1);output[part.id]=items;
}
await writeFile(new URL('../cad/mount-scenes.json',import.meta.url),JSON.stringify(output,null,2)+'\n');console.log('Extracted exact hardware transforms for all six mounts.');
