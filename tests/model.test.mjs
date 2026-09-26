import {test} from 'node:test';
import assert from 'node:assert/strict';
import {example,validate,scad,footprint,issues} from '../model.js';
test('layout round-trip retains optical centers, rotations, and connections',()=>{const a=example();assert.deepEqual(validate(JSON.parse(JSON.stringify(a))),a);});
test('untrusted layouts reject nonfinite numbers, duplicate IDs and dangling links',()=>{for(const mutate of[s=>s.components[0].x=NaN,s=>s.components[1].id=s.components[0].id,s=>s.connections[0][0]='missing',s=>s.components[0].type='cube();',s=>s.plate.beamHeight=30]){const s=example();mutate(s);assert.throws(()=>validate(s));}});
test('SCAD uses native c4po cutters at optical centers and excludes hardware from plate',()=>{const code=scad(example());assert.match(code,/translate\(\[140,50,0\]\) rotate\(\[0,0,135\]\)/);assert.match(code,/components\(drill=true,show=false\)/);assert.match(code,/show_components=false/);assert.match(code,/translate\(\[0,0,-base_dz-25.4\]\)/);assert.match(scad(example(),true),/show_components=true/);});
test('labels cannot inject OpenSCAD code',()=>{const s=example();s.components[0].label='"; cube(999); //';assert.ok(!scad(s).includes('cube(999)'));});
test('mount envelope rotates around optical center, including offset',()=>{const s=example(),c={...s.components[0],type:'k05s1',x:100,y:100,angle:0};const a=footprint(c);c.angle=90;const b=footprint(c);assert.ok(Math.abs((a[0][0]-100)-(b[0][1]-100))<1e-8);});
test('mechanical checks identify insufficient floor and edge placement',()=>{const s=example();s.plate.thickness=5;s.components[1].x=0;assert.ok(issues(s).some(s=>s.includes('edge')));assert.ok(issues(s).some(s=>s.includes('less than 2 mm')));});
