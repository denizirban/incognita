#!/usr/bin/env node
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('md-gate.html','utf8'),source=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('function inspect('));
if(!source)throw Error('Missing gate implementation');
const nodes=new Map(),document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,{checked:false,disabled:false,textContent:'',files:[],replaceChildren(){},append(){}});return nodes.get(s)}};
const ctx={document,Map,Set,Number,JSON,Math};vm.createContext(ctx);vm.runInContext(source,ctx,{timeout:3000});
const line=(record,atom,res,chain,num,x,y,z,element)=>record.padEnd(6)+'    1 '+atom.padStart(4)+' '+res.padStart(3)+' '+chain+String(num).padStart(4)+'    '+[x,y,z].map(v=>v.toFixed(3).padStart(8)).join('')+'  1.00 20.00          '+element.padStart(2);
const standard=line('ATOM','CA','ALA','A',1,1,2,3,'C');
const good=vm.runInContext('inspect('+JSON.stringify(standard)+')',ctx);
if(good.md_ready!==false||good.atom_records!==1||good.findings.some(f=>f.severity==='BLOCK'))throw Error('Clean protein must remain unverified, not blocked');
const metal=vm.runInContext('inspect('+JSON.stringify(standard+'\n'+line('HETATM','ZN','ZN','A',999,0,0,0,'ZN'))+')',ctx);
if(metal.md_ready!==false||!metal.findings.some(f=>f.severity==='BLOCK'))throw Error('Metal structure must be blocked');
const empty=vm.runInContext("inspect('')",ctx);
if(empty.md_ready!==false||!empty.findings.some(f=>f.severity==='BLOCK'))throw Error('Empty structure must be blocked');
console.log('PASS: conservative MD gate, metal exclusion and empty-structure checks');
