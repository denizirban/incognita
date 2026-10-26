#!/usr/bin/env node
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const html=fs.readFileSync('molecular-viewer.html','utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(js,{filename:'molecular-viewer.inline.js'});
assert(js.includes("atom:'SG'"),'C431 spotlight must select sulfur atom');
assert(js.includes("dx*dx+dy*dy+dz*dz<=36"),'Neighborhood must be defined as 6 Å radial distance');
assert(js.includes("if(!center)"),'Missing catalytic sulfur must be handled');
assert(js.includes("currentProtein!=='O60260'"),'Only verified Parkin references may use spotlight');
assert(js.includes("Proximity is not proof of functional contact."),'Scientific caveat required');
console.log('PASS: viewer JavaScript syntax, C431 geometry, missing-atom guard and scientific caveat');
