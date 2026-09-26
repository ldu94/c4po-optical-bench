import {createOpenSCAD} from './vendor/openscad/openscad.js';
import {scad} from './model.js';
self.onmessage=async ({data})=>{
 const logs=[];
 try{
  self.postMessage({status:'Loading OpenSCAD…'});
  const api=await createOpenSCAD({print:t=>logs.push(t),printErr:t=>logs.push(t)}),instance=api.getInstance();
  const files=['thorlabs_optomech.scad','util.scad'];
  instance.FS.mkdir('/thorlabs');
  await Promise.all(files.map(async f=>{const r=await fetch('./cad/'+f);if(!r.ok)throw Error(`Cannot load CAD library: ${f}`);instance.FS.writeFile('/'+f,new Uint8Array(await r.arrayBuffer()));}));
  self.postMessage({status:'Cutting mounting holes and recesses…'});
  instance.FS.writeFile('/layout.scad',scad(data.layout,false));
  const code=instance.callMain(['/layout.scad','-o','/plate.stl']);
  if(code!==0||logs.some(t=>/^ERROR:|^WARNING:.*(Can't open|Ignoring unknown module|Unable to open)/i.test(t)))throw Error(logs.slice(-15).join('\n')||'OpenSCAD could not render this layout.');
  const bytes=instance.FS.readFile('/plate.stl');if(bytes.length<100)throw Error('OpenSCAD returned empty geometry.');
  self.postMessage({bytes,logs},[bytes.buffer]);
 }catch(e){self.postMessage({error:e.message,logs});}
};
