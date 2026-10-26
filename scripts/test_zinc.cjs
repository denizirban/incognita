#!/usr/bin/env node
// Exercise the actual browser zinc audit implementation with synthetic coordinate fixtures.
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('zinc-audit.html','utf8');
const source=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('function audit('));
if(!source)throw Error('Missing zinc audit source');
const nodes=new Map(),document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,{files:[],textContent:'',disabled:false,replaceChildren(){},append(){}});return nodes.get(s)}};
const ctx={document,Math,Map,Set,Number,JSON};vm.createContext(ctx);vm.runInContext(source,ctx,{timeout:3000});
const record=(type,id,atom,res,chain,num,x,y,z,element)=>type.padEnd(6)+String(id).padStart(5)+' '+atom.padStart(4)+' '+res.padStart(3)+' '+chain+String(num).padStart(4)+'    '+[x,y,z].map(v=>v.toFixed(3).padStart(8)).join('')+'  1.00 20.00          '+element.padStart(2);
const zinc=record('HETATM',1,'ZN','ZN','A',999,0,0,0,'ZN');
const s=2.25/Math.sqrt(3),positions=[[s,s,s],[s,-s,-s],[-s,s,-s],[-s,-s,s]];
const tetra=[zinc,...positions.map((p,i)=>record('ATOM',i+2,'SG','CYS','A',i+10,...p,'S'))].join('\n');
const plausible=vm.runInContext('audit('+JSON.stringify(tetra)+')',ctx);
if(plausible.zinc_sites!==1||plausible.sites[0].geometry_screen!=='GEOMETRY_PLAUSIBLE'||plausible.sites[0].tetrahedral_angle_rmsd_deg>0.2)throw Error('Tetrahedral fixture failed: '+JSON.stringify(plausible.sites));
const linear=[zinc,...[[2.2,0,0],[-2.2,0,0],[0,2.2,0],[0,-2.2,0]].map((p,i)=>record('ATOM',i+2,'SG','CYS','A',i+10,...p,'S'))].join('\n');
const invalid=vm.runInContext('audit('+JSON.stringify(linear)+')',ctx);
if(invalid.sites[0].geometry_screen!=='REVIEW_REQUIRED')throw Error('Non-tetrahedral fixture incorrectly passed');
const absent=vm.runInContext('audit('+JSON.stringify(tetra.split('\n').slice(1).join('\n'))+')',ctx);
if(absent.zinc_sites!==0)throw Error('Missing zinc fixture failed');
console.log('PASS: tetrahedral coordination, planar decoy, and missing-Zn controls');
