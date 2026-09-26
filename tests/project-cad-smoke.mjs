import {createOpenSCAD} from '../vendor/openscad/openscad.js';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {validate,scad,layoutCadFiles} from '../model.js';
const index=JSON.parse(await readFile(new URL('../projects/index.json',import.meta.url))),render=process.argv.includes('--render');
const selected=process.argv.find(a=>a.startsWith('--project='))?.slice(10);
for(const p of index.projects.filter(p=>!selected||p.id===selected)){
 const layout=validate(JSON.parse(await readFile(new URL('../projects/'+p.id+'.json',import.meta.url)))),logs=[];
 const api=await createOpenSCAD({print:s=>logs.push(s),printErr:s=>logs.push(s)}),oc=api.getInstance();for(const dir of['thorlabs','projects','project-meshes'])oc.FS.mkdir('/'+dir);
 const bundle=JSON.parse(await readFile(new URL('../cad/project-geometry.json',import.meta.url)));for(const f of layoutCadFiles(layout))oc.FS.writeFile('/'+f,bundle[f]??await readFile(new URL('../cad/'+f,import.meta.url)));
 oc.FS.writeFile('/layout.scad',scad(layout));const target='/plate.'+(render?'stl':'csg'),code=oc.callMain(['/layout.scad','-o',target]);
 assert.equal(code,0,p.id+'\n'+logs.join('\n'));assert.ok(!logs.some(s=>/^ERROR:|^WARNING:/.test(s)),p.id+'\n'+logs.join('\n'));assert.ok(oc.FS.readFile(target).length>100,p.id+' returned empty geometry');console.log(p.id+': '+(render?'STL rendered':'CSG compiled'));
}
