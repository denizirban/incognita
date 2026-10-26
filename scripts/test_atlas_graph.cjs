#!/usr/bin/env node
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('parkinson-3d.html','utf8');
const source=html.match(/const nodes=\[([\s\S]*?)\];/);
if(!source)throw Error('Missing 3D atlas graph');
const nodes=vm.runInNewContext(source[0]+';nodes',{}, {timeout:2000});
const map=new Map(nodes.map(n=>[n.id,n]));
if(map.size!==nodes.length)throw Error('Duplicate atlas IDs');
if(!map.has('root')||map.get('root').parent!==null)throw Error('Invalid root');
for(const n of nodes){if(n.id!=='root'&&!map.has(n.parent))throw Error('Missing parent: '+n.id);if(!n.question||!n.known||!n.unknown||!n.referenceUrl||!n.referenceUrl.startsWith('https://'))throw Error('Missing scientific context: '+n.id);let cur=n,seen=new Set();while(cur.parent){if(seen.has(cur.id))throw Error('Cycle: '+n.id);seen.add(cur.id);cur=map.get(cur.parent)}}
const journey=html.match(/const journeys=(\{[\s\S]*?\});let journey=/);
if(!journey)throw Error('Missing guided journeys');
const journeys=vm.runInNewContext('('+journey[1]+')',{}, {timeout:2000});
for(const [name,steps] of Object.entries(journeys)){if(steps.length<2)throw Error('Journey too short: '+name);for(const step of steps){if(!map.has(step.id)||!step.title||!step.text)throw Error('Invalid journey step '+name)}}
const paths=[['eye','retina','retinalneuron'],['brain','neuron','mito','parkin']];
for(const path of paths){for(let i=1;i<path.length;i++)if(map.get(path[i]).parent!==path[i-1])throw Error('Broken exploration path: '+path.join(' > '))}
console.log('PASS: '+nodes.length+' nodes, '+Object.keys(journeys).length+' journeys, scientific references and hierarchy');
