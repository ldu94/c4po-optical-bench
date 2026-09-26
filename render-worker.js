import {projectGeometry} from './projects.js';
import {createOpenSCAD} from './vendor/openscad/openscad.js';
import {scad,layoutCadFiles} from './model.js';
self.onmessage=async ({data})=>{
 const logs=[];
 try{
  self.postMessage({status:'Loading OpenSCAD…'});
  const api=await createOpenSCAD({print:t=>logs.push(t),printErr:t=>logs.push(t)}),instance=api.getInstance();
  const files=layoutCadFiles(data.layout),bundle=files.some(f=>f.startsWith('projects/'))?await projectGeometry():{};
  for(const dir of ['/thorlabs','/projects','/project-meshes'])instance.FS.mkdir(dir);
  await Promise.all(files.map(async f=>{if(bundle[f]!==undefined){instance.FS.writeFile('/'+f,bundle[f]);return;}const r=await fetch('./cad/'+f);if(!r.ok)throw Error(`Cannot load CAD library: ${f}`);instance.FS.writeFile('/'+f,new Uint8Array(await r.arrayBuffer()));}));
  self.postMessage({status:'Cutting mounting holes and recesses…'});
  instance.FS.writeFile('/layout.scad',scad(data.layout,false));
  const code=instance.callMain(['/layout.scad','-o','/plate.stl']);
  if(code!==0||logs.some(t=>/^ERROR:|^WARNING:.*(Can't open|Ignoring unknown module|Unable to open)/i.test(t)))throw Error(logs.slice(-15).join('\n')||'OpenSCAD could not render this layout.');
  const bytes=instance.FS.readFile('/plate.stl');if(bytes.length<100)throw Error('OpenSCAD returned empty geometry.');
  self.postMessage({bytes,logs},[bytes.buffer]);
 }catch(e){self.postMessage({error:e.message,logs});}
};
