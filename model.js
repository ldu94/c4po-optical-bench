// Positions are optical centers in mm; +Y is up, rotation is CCW about +Z.
export const catalog = [
  {id:'k05s1', name:'Polaris mirror', part:'POLARIS-K05S1', kind:'mirror', module:'mirror_mount_k05s1', width:34, depth:30, offset:-14, h:12.7, file:'POLARIS-K05S1-Solidworks.stl', args:'use_nut=false, show_mirror=show'},
  {id:'c05g', name:'Fixed mirror', part:'POLARIS-C05G', kind:'mirror', module:'mirror_mount_c05g', width:28, depth:25, offset:-12.4, h:12.7, file:'POLARIS-C05G-Solidworks.stl', args:'use_nut=false, show_mirror=show'},
  {id:'km100', name:'1″ mirror mount', part:'KM100', kind:'mirror', module:'mirror_mount_km100', width:48, depth:44, offset:-14, h:25.4, file:'KM100-Solidworks.stl', args:'use_nut=false'},
  {id:'l05g', name:'½″ lens mount', part:'POLARIS-L05G', kind:'lens', module:'lens_holder_l05g', width:28, depth:23, offset:-9.5, h:12.7, file:'POLARIS-L05G-Solidworks.stl', args:'use_nut=false'},
  {id:'lmr1', name:'1″ lens mount', part:'LMR1', kind:'lens', module:'lens_holder_lmr1', width:36, depth:15, offset:0, h:22.1, file:'LMR1-Solidworks.stl', args:'use_nut=false'},
  {id:'ida12', name:'Adjustable iris', part:'IDA12', kind:'iris', module:'pinhole_ida12', width:28, depth:14, offset:0, h:12.8, file:'IDA12-P5-Solidworks.stl', args:'use_nut=false, use_surface=false'},
  {id:'isomet1205', name:'Isomet AOM assembly', part:'1205C · KM100PM', category:'AOMs', kind:'aom', module:'isomet_on_mount_km100pm', width:72, depth:90, offset:-23, h:26, previewDz:12.7, args:'use_nut=false'},
  {id:'brimrose8040', name:'Brimrose AOM assembly', part:'TEF-80-40 · KM100PM', category:'AOMs', kind:'aom', module:'brimrose_on_mount_km100pm', width:76, depth:100, offset:-26, h:26, previewDz:12.7, args:'use_nut=false, hole_dz=22.9-16.5, show_label=false'},
  {id:'gh3080', name:'Gooch & Housego AOM', part:'3080 · KM100PM', category:'AOMs', kind:'aom', module:'gooch_housego_3080_on_mount_km100pm', width:72, depth:100, offset:-23, h:26, originShift:[-33,0,0], previewDz:12.7, args:'use_nut=false'},
  {id:'rsp05', name:'½″ waveplate rotation', part:'RSP05 · low-profile adapter', category:'Polarization', kind:'waveplate', module:'rotation_stage_rsp05', width:36, depth:25, offset:0, h:20.35, previewDz:12.7, args:'use_nut=false, low_profile=true, show_mount=show'},
  {id:'rsp1', name:'1″ waveplate rotation', part:'RSP1', category:'Polarization', kind:'waveplate', module:'rotation_stage_rsp1', width:58, depth:30, offset:0, h:27.7, previewDz:0, args:'use_nut=false'},
  {id:'pbs10', name:'PBS cube on skate mount', part:'10 mm PBS · skate adapter', category:'Polarization', kind:'pbs', module:'pbs_on_skate_mount', width:30, depth:16, offset:0, h:12.7, previewDz:12.7, requiredBeamHeight:12.7, args:'cube_size=10', note:'Skate adapter uses a 12.7 mm beam height.'},
  {id:'fiberport', name:'Side-mounted fiber port', part:'HCA3 · side mounting', category:'Coupling & detection', kind:'fiber', module:'fiberport_sidemount', width:42, depth:20, offset:-8, h:26.9, previewDz:0, sideMount:true, args:'use_nut=false', note:'Place at a plate edge; its mounting holes drill horizontally into the side. HCA3 holder only; coupler not modeled in the source.'},
  {id:'det10a2', name:'Photodetector assembly', part:'DET10A2 · cage adapter', category:'Coupling & detection', kind:'detector', module:'pd_det10a2', width:70, depth:42, offset:10, h:27.7, previewDz:12.7, args:'use_nut=false, platemount=true'},
  {id:'io850', name:'Optical isolator', part:'IO-3D-850', category:'Coupling & detection', kind:'isolator', module:'isolator_io_3D_850', width:38, depth:40, offset:0, h:17.1, previewDz:0, args:'use_surface_adapter=false'},
  {id:'cage', name:'Cage plate & adapter', part:'CP02', category:'Mounts & irises', kind:'iris', module:'cage_mount', width:66, depth:16, offset:4.4, h:27.7, previewDz:12.7, args:'show_mount=show'},
  {id:'iris_slide', name:'Sliding adjustable iris', part:'IDA12 · 4 mm slider', category:'Mounts & irises', kind:'iris', module:'pinhole_ida12_slide_mount', width:30, depth:25, offset:0, h:20, previewDz:12.7, requiredBeamHeight:12.7, note:'Sliding bracket uses a 12.7 mm beam height.', args:'use_nut=false, slide_range=4, show_mount=show'},
  {id:'k05s2', name:'Polaris locking mirror', part:'POLARIS-K05S2', category:'Mirrors & lenses', kind:'mirror', module:'mirror_mount_k05s2', width:36, depth:32, offset:-14, h:12.7, previewDz:0, args:'use_nut=false, show_mirror=show'},
];
for(const part of catalog)part.category??=part.kind==='iris'?'Mounts & irises':'Mirrors & lenses';
export const cadFiles=['c4po-web.scad','thorlabs_optomech.scad','aom_optomech.scad','util.scad'];
export function cadCall(part,dz='base_dz',show='show',drill='drill'){return `${part.originShift?`translate(${JSON.stringify(part.originShift)}) `:''}${part.module}(dz=${dz}, drill=${drill}, show=${show}, ${part.args.replaceAll('=show',`=${show}`)});`;}
export const byId = Object.assign(Object.create(null),Object.fromEntries(catalog.map(c=>[c.id,c])));
export function example(){ return {version:2,view:{showBeams:true,showMounts:false},name:'Folded optical path',plate:{width:260,height:180,thickness:25.4,beamHeight:12.7,grid:12.7,snap:1,cornerHoles:true},components:[
{id:'iris-1',type:'ida12',label:'Iris',x:35,y:50,angle:0},
{id:'lens-1',type:'lmr1',label:'Lens 1',x:80,y:50,angle:0},
{id:'mirror-1',type:'k05s1',label:'Mirror 1',x:140,y:50,angle:135},
{id:'mirror-2',type:'c05g',label:'Mirror 2',x:140,y:120,angle:-45},
{id:'lens-2',type:'l05g',label:'Lens 2',x:205,y:120,angle:0}],connections:[['iris-1','lens-1'],['lens-1','mirror-1'],['mirror-1','mirror-2'],['mirror-2','lens-2']]}; }
const number = (v,min,max,name)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)throw Error(`${name} must be between ${min} and ${max}.`); return v;};
export function validate(data){
 if(!data||![1,2].includes(data.version))throw Error('This is not a supported C4PO layout (versions 1–2).');
 if(typeof data.name!=='string'||data.name.length>100)throw Error('Layout name must be at most 100 characters.');
 const p=data.plate;if(!p)throw Error('Missing plate settings.');
 number(p.width,50,1000,'Plate width');number(p.height,50,1000,'Plate height');number(p.thickness,5,60,'Plate thickness');
 // This first catalog supports recessed mounts. Higher beams require separate post generation.
 number(p.beamHeight,5,12.7,'Beam height');number(p.grid,1,100,'Grid');number(p.snap,0,25.4,'Snap');
 if(typeof p.cornerHoles!=='boolean')throw Error('Invalid corner mounting holes setting.');
 if(!Array.isArray(data.components)||data.components.length>100)throw Error('Maximum 100 components.');
 const ids=new Set();
 for(const c of data.components){
  if(!byId[c.type])throw Error(`Unknown component type: ${String(c.type).slice(0,60)}`);
  if(typeof c.id!=='string'||!c.id||c.id.length>100||ids.has(c.id))throw Error('Component IDs must be unique.');ids.add(c.id);
  if(typeof c.label!=='string'||c.label.length>60)throw Error('Labels must be at most 60 characters.');
  if(byId[c.type].requiredBeamHeight && Math.abs(p.beamHeight-byId[c.type].requiredBeamHeight)>1e-6)throw Error(`${byId[c.type].name} needs a ${byId[c.type].requiredBeamHeight} mm beam height.`);
  number(c.x,0,p.width,'X');number(c.y,0,p.height,'Y');number(c.angle,-360,360,'Angle');
 }
 if(!Array.isArray(data.connections)||data.connections.length>300)throw Error('Invalid beam guides.');
 for(const e of data.connections)if(!Array.isArray(e)||e.length!==2||e[0]===e[1]||!e.every(id=>ids.has(id)))throw Error('A beam guide has an invalid endpoint.');
 const result=structuredClone(data);result.version=2;result.view={showBeams:data.view?.showBeams??true,showMounts:data.view?.showMounts??false};
 if(typeof result.view.showBeams!=='boolean'||typeof result.view.showMounts!=='boolean')throw Error('Invalid viewer settings.');
 return result;
}
export function footprint(c){const d=byId[c.type],r=c.angle*Math.PI/180;return [[-d.depth/2,-d.width/2],[d.depth/2,-d.width/2],[d.depth/2,d.width/2],[-d.depth/2,d.width/2]].map(([x,y])=>{x+=d.offset;return [c.x+x*Math.cos(r)-y*Math.sin(r),c.y+x*Math.sin(r)+y*Math.cos(r)];});}
export function overlaps(a,b){return ![a,b].some(poly=>poly.some((p,i)=>{const q=poly[(i+1)%poly.length],axis=[q[1]-p[1],p[0]-q[0]],proj=s=>s.map(v=>v[0]*axis[0]+v[1]*axis[1]),pa=proj(a),pb=proj(b);return Math.max(...pa)<Math.min(...pb)||Math.max(...pb)<Math.min(...pa);}));}
export function issues(s){const out=[],p=s.plate;
 for(const c of s.components){const d=byId[c.type];if(!d.sideMount&&footprint(c).some(([x,y])=>x<2||y<2||x>p.width-2||y>p.height-2))out.push(`${c.label}: approximate mount envelope reaches the plate edge.`);
 if(d.h-p.beamHeight>p.thickness-2)out.push(`${c.label}: recess leaves less than 2 mm of plate below the mount.`);}
 for(let i=0;i<s.components.length;i++)for(let j=i+1;j<s.components.length;j++)if(overlaps(footprint(s.components[i]),footprint(s.components[j])))out.push(`${s.components[i].label} / ${s.components[j].label}: approximate mount envelopes overlap.`);
 return out;
}
const n=v=>Number(v.toFixed(5));
export function scad(s,assembly=false){validate(s);const p=s.plate;
 return `// Generated by C4PO Optical Bench. Units: mm. +Y up; angles CCW.\n// Place in the original c4po folder or this app's cad/ directory for desktop rendering.\n// Mechanical geometry comes from the existing c4po library.\nuse <aom_optomech.scad>;\ninclude <thorlabs_optomech.scad>;\n$fn=48;\nbase_dz=${n(p.beamHeight)};\nshow_components=${assembly};\nmodule components(drill=false,show=false){\n${s.components.map(c=>`  translate([${n(c.x)},${n(c.y)},0]) rotate([0,0,${n(c.angle)}])\n    ${cadCall(byId[c.type])}`).join('\n')}\n}\nmodule plate(){\n difference(){\n  translate([0,0,-base_dz-${n(p.thickness)}]) cube([${n(p.width)},${n(p.height)},${n(p.thickness)}]);\n  components(drill=true,show=false);\n${p.cornerHoles?`  // 1/4-20 clearance holes, 12.7 mm from each edge.\n  for(x=[12.7,${n(p.width-12.7)}], y=[12.7,${n(p.height-12.7)}])\n   translate([x,y,-base_dz-${n(p.thickness)}-1]) cylinder(d=6.604,h=${n(p.thickness+2)});`:''}\n }\n}\nplate();\nif(show_components) components(drill=false,show=true);\n`;}

// Editable starting layout adapted from doublepass_aom.scad (standard Isomet configuration).
// Optional/hidden cuts, labels, and bespoke table mounting holes are not imported.
export function doublePassExample(){
 const s=example();s.name='Double-pass AOM';s.plate={...s.plate,width:278.4,height:127,thickness:25.4,cornerHoles:false};s.view={showBeams:true,showMounts:true};
 const x=20+30*Math.tan(55*Math.PI/180),pbs=x+50,out=pbs+100;
 const rows=[['fp_in','fiberport',20,127,-90],['hwp_in','rsp05',20,107,90],['mIn1','c05g',20,78,62.5],['mIn2','k05s1',x,108,-117.5],['mIn3','k05s1',x,70,45],['PBS','pbs10',pbs,70,0],['tele_1','l05g',161,70,0],['tele_2','l05g',211,70,0],['turn_1','k05s1',262,70,-135],['turn_2','k05s1',262,38,135],['AOM','isomet1205',223,38,0],['QWP','rsp05',148,38,0],['cat_lens','l05g',123,38,0],['cat_mirror','k05s1',22,38,0],['mOut1','k05s1',pbs,106,-45],['HWP_out','rsp05',pbs+35,106,0],['mOut2','k05s1',out,106,135],['fp_out','fiberport',out,127,-90]];
 s.components=rows.map(([id,type,x,y,angle])=>({id,type,x,y,angle,label:id.replaceAll('_',' ')}));
 const paths=[['fp_in','hwp_in','mIn1','mIn2','mIn3','PBS','tele_1','tele_2','turn_1','turn_2','AOM','QWP','cat_lens','cat_mirror'],['cat_mirror','cat_lens','QWP','AOM','turn_2','turn_1','tele_2','tele_1','PBS','mOut1','HWP_out','mOut2','fp_out']];
 s.connections=paths.flatMap(path=>path.slice(1).map((id,i)=>[path[i],id]));return validate(s);
}
export function beamSegments(layout){const parts=new Map(layout.components.map(c=>[c.id,c]));return layout.connections.map(([a,b])=>[parts.get(a),parts.get(b)]).filter(([a,b])=>a&&b).map(([a,b])=>({start:[a.x,a.y,0],end:[b.x,b.y,0]}));}
