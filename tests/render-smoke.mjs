import {createOpenSCAD} from '../vendor/openscad/openscad.js';
import {example,scad,catalog,cadFiles,doublePassExample,layoutCadFiles} from '../model.js';
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const layout=process.argv.includes("--double-pass")?doublePassExample():example();if(process.argv.includes('--all'))layout.components=catalog.slice(0,6).map((c,i)=>({id:c.id,type:c.id,label:c.name,x:35+(i%3)*80,y:40+Math.floor(i/3)*90,angle:i*30}));
if(process.argv.includes('--expanded')){layout.plate.width=900;layout.plate.height=900;layout.components=catalog.filter(p=>!p.sourceAsset).map((c,i)=>({id:c.id,type:c.id,label:c.name,x:100+(i%4)*200,y:100+Math.floor(i/4)*160,angle:0}));}
layout.connections=[];
const assembly=false;
const logs=[];const api=await createOpenSCAD({print:t=>logs.push(t),printErr:t=>logs.push(t)}),oc=api.getInstance();for(const dir of ['/thorlabs','/projects','/project-meshes'])oc.FS.mkdir(dir);
for(const file of layoutCadFiles(layout))oc.FS.writeFile('/'+file,await readFile(new URL('../cad/'+file,import.meta.url)));
oc.FS.writeFile('/layout.scad',scad(layout,assembly));const code=oc.callMain(['/layout.scad','-o','/plate.stl']);
console.log(logs.join('\n'));assert.equal(code,0);assert.ok(!logs.some(t=>/^(ERROR|WARNING):/.test(t)),logs.join('\n'));
const result=oc.FS.readFile('/plate.stl');assert.ok(result.length>1000);await writeFile('/tmp/ike-'+(assembly?'assembly':'plate')+'.stl',result);console.log(`Render successful: ${result.length} bytes`);
{
 const vertices=[...new TextDecoder().decode(result).matchAll(/vertex\s+(\S+)\s+(\S+)\s+(\S+)/g)].map(m=>m.slice(1).map(Number));
 assert.ok(vertices.length>100);
 const bounds=[0,1,2].map(i=>[Math.min(...vertices.map(v=>v[i])),Math.max(...vertices.map(v=>v[i]))]);
 assert.ok(Math.abs(bounds[0][0])<1e-3&&Math.abs(bounds[1][0])<1e-3);
 assert.ok(Math.abs(bounds[0][1]-layout.plate.width)<1e-3&&Math.abs(bounds[1][1]-layout.plate.height)<1e-3);
 assert.ok(Math.abs(bounds[2][0]+38.1)<1e-3&&Math.abs(bounds[2][1]+12.7)<1e-3);
 function rayHits(x,y){const hits=[];for(let i=0;i<vertices.length;i+=3){const [a,b,c]=vertices.slice(i,i+3),den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)<1e-10)continue;const u=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den,v=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den;if(u>=-1e-8&&v>=-1e-8&&u+v<=1+1e-8)hits.push(Number((u*a[2]+v*b[2]+(1-u-v)*c[2]).toFixed(4)));}return [...new Set(hits)].sort((a,b)=>a-b);}
 if(process.argv.includes('--all')){
 assert.deepEqual(rayHits(21,40),[], 'K05S1 screw must cut through at optical X minus 14 mm');
 assert.deepEqual(rayHits(12.7,12.7),[], 'corner clearance must cut through');
 assert.deepEqual(rayHits(10,80),[-38.1,-12.7], 'plate material must remain between holes');
 assert.deepEqual(rayHits(21,45),[-38.1,-15.75], 'alignment pin recess must remain blind');
 console.log('Plate bounds, screw offset, clearance bore, blind pin hole and stock verified.');
 }
}
