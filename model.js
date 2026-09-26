// Positions are optical centers in mm; +Y is up, rotation is CCW about +Z.
export const catalog = [
  {id:'k05s1', name:'Polaris mirror', part:'POLARIS-K05S1', kind:'mirror', module:'mirror_mount_k05s1', width:34, depth:30, offset:-14, h:12.7, file:'POLARIS-K05S1-Solidworks.stl', args:'use_nut=false, show_mirror=show'},
  {id:'c05g', name:'Fixed mirror', part:'POLARIS-C05G', kind:'mirror', module:'mirror_mount_c05g', width:28, depth:25, offset:-12.4, h:12.7, file:'POLARIS-C05G-Solidworks.stl', args:'use_nut=false, show_mirror=show'},
  {id:'km100', name:'1″ mirror mount', part:'KM100', kind:'mirror', module:'mirror_mount_km100', width:48, depth:44, offset:-14, h:25.4, file:'KM100-Solidworks.stl', args:'use_nut=false'},
  {id:'l05g', name:'½″ lens mount', part:'POLARIS-L05G', kind:'lens', module:'lens_holder_l05g', width:28, depth:23, offset:-9.5, h:12.7, file:'POLARIS-L05G-Solidworks.stl', args:'use_nut=false'},
  {id:'lmr1', name:'1″ lens mount', part:'LMR1', kind:'lens', module:'lens_holder_lmr1', width:36, depth:15, offset:0, h:22.1, file:'LMR1-Solidworks.stl', args:'use_nut=false'},
  {id:'ida12', name:'Adjustable iris', part:'IDA12', kind:'iris', module:'pinhole_ida12', width:28, depth:14, offset:0, h:12.8, file:'IDA12-P5-Solidworks.stl', args:'use_nut=false, use_surface=false'},
];
export const byId = Object.fromEntries(catalog.map(c=>[c.id,c]));
export function example(){ return {version:1,name:'Folded optical path',plate:{width:260,height:180,thickness:25.4,beamHeight:12.7,grid:12.7,snap:1,cornerHoles:true},components:[
{id:'iris-1',type:'ida12',label:'Iris',x:35,y:50,angle:0},
{id:'lens-1',type:'lmr1',label:'Lens 1',x:80,y:50,angle:0},
{id:'mirror-1',type:'k05s1',label:'Mirror 1',x:140,y:50,angle:135},
{id:'mirror-2',type:'c05g',label:'Mirror 2',x:140,y:120,angle:-45},
{id:'lens-2',type:'l05g',label:'Lens 2',x:205,y:120,angle:0}],connections:[['iris-1','lens-1'],['lens-1','mirror-1'],['mirror-1','mirror-2'],['mirror-2','lens-2']]}; }
const number = (v,min,max,name)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)throw Error(`${name} must be between ${min} and ${max}.`); return v;};
export function validate(data){
 if(!data||data.version!==1)throw Error('This is not a supported C4PO layout (version 1).');
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
  number(c.x,0,p.width,'X');number(c.y,0,p.height,'Y');number(c.angle,-360,360,'Angle');
 }
 if(!Array.isArray(data.connections)||data.connections.length>300)throw Error('Invalid beam guides.');
 for(const e of data.connections)if(!Array.isArray(e)||e.length!==2||e[0]===e[1]||!e.every(id=>ids.has(id)))throw Error('A beam guide has an invalid endpoint.');
 return structuredClone(data);
}
export function footprint(c){const d=byId[c.type],r=c.angle*Math.PI/180;return [[-d.depth/2,-d.width/2],[d.depth/2,-d.width/2],[d.depth/2,d.width/2],[-d.depth/2,d.width/2]].map(([x,y])=>{x+=d.offset;return [c.x+x*Math.cos(r)-y*Math.sin(r),c.y+x*Math.sin(r)+y*Math.cos(r)];});}
export function overlaps(a,b){return ![a,b].some(poly=>poly.some((p,i)=>{const q=poly[(i+1)%poly.length],axis=[q[1]-p[1],p[0]-q[0]],proj=s=>s.map(v=>v[0]*axis[0]+v[1]*axis[1]),pa=proj(a),pb=proj(b);return Math.max(...pa)<Math.min(...pb)||Math.max(...pb)<Math.min(...pa);}));}
export function issues(s){const out=[],p=s.plate;
 for(const c of s.components){const d=byId[c.type];if(footprint(c).some(([x,y])=>x<2||y<2||x>p.width-2||y>p.height-2))out.push(`${c.label}: approximate mount envelope reaches the plate edge.`);
 if(d.h-p.beamHeight>p.thickness-2)out.push(`${c.label}: recess leaves less than 2 mm of plate below the mount.`);}
 for(let i=0;i<s.components.length;i++)for(let j=i+1;j<s.components.length;j++)if(overlaps(footprint(s.components[i]),footprint(s.components[j])))out.push(`${s.components[i].label} / ${s.components[j].label}: approximate mount envelopes overlap.`);
 return out;
}
const n=v=>Number(v.toFixed(5));
export function scad(s,assembly=false){validate(s);const p=s.plate;
 return `// Generated by C4PO Optical Bench. Units: mm. +Y up; angles CCW.\n// Place next to thorlabs_optomech.scad and util.scad for desktop rendering.\n// Mechanical geometry comes from the existing c4po library.\nuse <thorlabs_optomech.scad>;\n$fn=48;\nbase_dz=${n(p.beamHeight)};\nshow_components=${assembly};\nmodule components(drill=false,show=false){\n${s.components.map(c=>`  translate([${n(c.x)},${n(c.y)},0]) rotate([0,0,${n(c.angle)}])\n    ${byId[c.type].module}(dz=base_dz, drill=drill, show=show, ${byId[c.type].args});`).join('\n')}\n}\nmodule plate(){\n difference(){\n  translate([0,0,-base_dz-${n(p.thickness)}]) cube([${n(p.width)},${n(p.height)},${n(p.thickness)}]);\n  components(drill=true,show=false);\n${p.cornerHoles?`  // 1/4-20 clearance holes, 12.7 mm from each edge.\n  for(x=[12.7,${n(p.width-12.7)}], y=[12.7,${n(p.height-12.7)}])\n   translate([x,y,-base_dz-${n(p.thickness)}-1]) cylinder(d=6.604,h=${n(p.thickness+2)});`:''}\n }\n}\nplate();\nif(show_components) components(drill=false,show=true);\n`;}
