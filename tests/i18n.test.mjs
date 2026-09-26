import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {translate} from '../i18n.js';
import {projectDescriptions} from '../project-descriptions.js';
test('every starter has distinct bilingual descriptions',async()=>{const index=JSON.parse(await readFile(new URL('../projects/index.json',import.meta.url)));for(const id of ['guided-double-pass',...index.projects.map(p=>p.id)]){const d=projectDescriptions[id];assert.equal(d.length,2,id);assert.match(d[1],/[\u4e00-\u9fff]/);assert.equal(translate(d[0],'zh'),d[1]);assert.equal(translate(d[0],'en'),d[0]);}});
test('dynamic generation status and warnings translate without changing names',()=>{assert.equal(translate('Base plate rendered · 224 KB','zh'),'带孔底板已生成 · 224 KB');assert.equal(translate('Custom mirror: approximate mount envelope reaches the plate edge.','zh'),'Custom mirror：近似安装件轮廓到达底板边缘。');assert.equal(translate('Unknown user name','zh'),'Unknown user name');assert.equal(translate('3D model','en'),'3D model');});
