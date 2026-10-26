#!/usr/bin/env node
// Extract the inline comparison script and exercise the same alignment code shipped to browsers.
const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('compare.html', 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
const code = scripts.map(m => m[1]).find(s => s.includes('function alignmentSelfTest'));
if (!code) throw new Error('Missing structural comparison implementation');
const nodes = new Map();
const document = {querySelector: selector => {
  if (!nodes.has(selector)) nodes.set(selector, {textContent:'',files:[],value:'8',disabled:false,replaceChildren(){},append(){}});
  return nodes.get(selector);
}};
const context = {document, window:{addEventListener(){}},console,Math,Map,Set,Number,JSON};
vm.createContext(context);
vm.runInContext(code, context, {timeout:3000});
const error = vm.runInContext('alignmentSelfTest()',context,{timeout:3000});
if (!Number.isFinite(error) || error >= 0.001) throw new Error('Rigid-body alignment regression: '+error+' Å');
const identity = vm.runInContext('(()=>{const a=[[0,0,0],[1,0,0],[0,1,0],[0,0,1],[1,2,3],[3,4,2],[5,1,0],[4,3,1],[2,2,2],[3,1,4]];const f=align(a,a);return Math.sqrt(a.reduce((s,p)=>s+distance(p,f(p))**2,0)/a.length)})()',context,{timeout:3000});
if (!Number.isFinite(identity)||identity>=0.001)throw new Error('Identity alignment regression: '+identity+' Å');
console.log('PASS: known rotation + translation RMSD '+error.toFixed(8)+' Å; identity RMSD '+identity.toFixed(8)+' Å');
