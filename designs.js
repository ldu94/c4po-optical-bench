import {validate} from './model.js';
const SHELF_KEY='c4po-saved-designs-v1';
export function encodeDesign(layout){return JSON.stringify(validate(layout),null,2)+'\n';}
export function decodeDesign(text){if(text.length>1000000)throw Error('Design files must be smaller than 1 MB.');return validate(JSON.parse(text));}
export function safeFilename(name){return (name.replace(/[^a-zA-Z0-9_-]/g,'-').slice(0,80)||'optical-design')+'.json';}
export function readShelf(storage=localStorage){const value=JSON.parse(storage.getItem(SHELF_KEY)||'[]');if(!Array.isArray(value))throw Error('The saved-design list is invalid.');return value;}
export function saveToShelf(layout,storage=localStorage){const design=validate(layout),list=readShelf(storage),entry={name:design.name,savedAt:new Date().toISOString(),layout:design};const index=list.findIndex(e=>e.name===design.name);if(index>=0)list[index]=entry;else list.push(entry);storage.setItem(SHELF_KEY,JSON.stringify(list));return entry;}
export class DesignFiles{
 constructor(){this.file=null;this.directory=null;}
 get canChooseFolder(){return typeof window.showDirectoryPicker==='function';}
 get canSaveAs(){return typeof window.showSaveFilePicker==='function';}
 async saveAs(layout){if(!this.canSaveAs)return false;const text=encodeDesign(layout);const handle=await window.showSaveFilePicker({id:'c4po-designs',suggestedName:safeFilename(layout.name),types:[{description:'C4PO design',accept:{'application/json':['.json']}}]});await this.write(handle,text);this.file=handle;return true;}
 async write(handle,text){const writable=await handle.createWritable();try{await writable.write(text);await writable.close();}catch(e){try{await writable.abort();}catch{}throw e;}}
 async save(layout){if(!this.file)return false;await this.write(this.file,encodeDesign(layout));return true;}
 async chooseFolder(){this.directory=await window.showDirectoryPicker({id:'c4po-designs',mode:'readwrite'});await this.remember(this.directory);return this.entries();}
 async entries(){if(!this.directory)return [];const list=[];for await(const [name,handle] of this.directory.entries())if(handle.kind==='file'&&name.toLowerCase().endsWith('.json'))list.push({name,handle});return list.sort((a,b)=>a.name.localeCompare(b.name));}
 async open(handle){const file=await handle.getFile();if(file.size>1000000)throw Error('Design files must be smaller than 1 MB.');const layout=decodeDesign(await file.text());this.file=handle;return layout;}
 async saveInFolder(layout){if(!this.directory)throw Error('Choose a designs folder first.');const name=safeFilename(layout.name);let existing=null;try{existing=await this.directory.getFileHandle(name);}catch(e){if(e.name!=='NotFoundError')throw e;}if(existing&&!(this.file&&await existing.isSameEntry(this.file)))throw Error(`${name} already exists. Open it first to update it, or change this design’s name.`);const text=encodeDesign(layout),handle=existing||await this.directory.getFileHandle(name,{create:true});await this.write(handle,text);this.file=handle;return name;}
 async db(){return new Promise((resolve,reject)=>{const req=indexedDB.open('c4po-design-handles',1);req.onupgradeneeded=()=>req.result.createObjectStore('handles');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
 async remember(handle){try{const db=await this.db();await new Promise((resolve,reject)=>{const tx=db.transaction('handles','readwrite');tx.objectStore('handles').put(handle,'directory');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();}catch{/* Folder remains usable for this session when handle persistence is unavailable. */}}
 async restoreFolder(){try{const db=await this.db();const handle=await new Promise((resolve,reject)=>{const req=db.transaction('handles').objectStore('handles').get('directory');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});db.close();if(handle&&await handle.queryPermission({mode:'readwrite'})==='granted')this.directory=handle;}catch{}}
}
