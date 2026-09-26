import {validate,doublePassExample} from './model.js';
let indexPromise;
export async function projectIndex(){indexPromise??=fetch('./projects/index.json').then(async response=>{if(!response.ok)throw Error('The example library could not be loaded.');return response.json();});return indexPromise;}
export async function openProject(id){if(id==='guided-double-pass')return doublePassExample();const index=await projectIndex();if(!index.projects.some(p=>p.id===id))throw Error('Unknown example project.');const response=await fetch('./projects/'+encodeURIComponent(id)+'.json');if(!response.ok)throw Error('This example could not be loaded.');return validate(await response.json());}

let geometryPromise;
export function projectGeometry(){return geometryPromise??=fetch('./cad/project-geometry.json').then(async r=>{if(!r.ok)throw Error('The project geometry could not be loaded.');return r.json();});}
