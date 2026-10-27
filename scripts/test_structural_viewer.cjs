#!/usr/bin/env node
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const html=fs.readFileSync('parkin-atlas.html','utf8');
const match=html.match(/<script>\s*([\s\S]*?)<\/script>/);
assert(match,'Missing atlas script');
new vm.Script(match[1],{filename:'parkin-atlas.inline.js'});
for(const token of ['id="nativeMolecule"','id="molstarFallback"','id="switchViewer"','function useFallback(','function useClean(','viewer.resize()','if(serial===requestSerial)useFallback('])assert(html.includes(token),'Missing recovery path: '+token);
assert(!/(?<!\$)\$\('\.molecule-toolbar button\[data-view\]'\)\.forEach/.test(html),'Single-element selector cannot be iterated; viewer startup would fail');
assert(html.includes("$$('.molecule-toolbar button[data-view]').forEach"),'Representation toolbar must use querySelectorAll');
assert(html.includes('class="viewport fallback-mode"'),'Stable viewer must be visible by default');
assert(html.includes("fallbackMode=false"),'Clean viewer must be attempted automatically');
assert(html.includes('class="viewport fallback-mode"'),'Molstar must remain visible during clean viewer loading');
assert(html.includes("if($('#protein').value!=='O60260')return"),'Parkin variant annotations must not be selectable for unrelated proteins');
assert(html.includes("document.querySelector('.viewport').classList.remove('fallback-mode')"),'Clean viewer must appear only after model renders');
assert(html.includes("};load();"),'Viewer must initialize without waiting for external script window load');
assert(html.includes('visibility:hidden;pointer-events:none'),'Fallback must keep native canvas measurable for WebGL initialization');
assert(!html.includes('.viewport.fallback-mode #nativeMolecule{display:none}'),'Never initialize WebGL in display:none canvas');
assert(html.includes("if(!window.$3Dmol)await new Promise"),'Wait for external renderer before clean mode');
for(const selector of ['#domainTools button','#variants button','.molecule-toolbar button[data-view]']) {
  const bad = "$('"+selector+"').forEach";
  assert(!html.includes(bad) || html.includes(' atlas script syntax, native canvas sizing, Molstar fallback and manual viewer switch');
+bad),'Selector must use querySelectorAll: '+selector);
}
assert(html.includes("backgroundColor:'#0c1420'"),'Clean viewer should match dark background');
assert(!html.includes("$$('"),'Invalid triple-dollar DOM selector causes click handler errors');
assert(html.includes("$('.molecule-toolbar button[data-view]').forEach(x=>x.classList.toggle('active',x===b))"),'View buttons must update selected state');
assert(html.includes("viewStyle=b.dataset.view;"),'View buttons must change rendering style');
console.log('PASS: atlas script syntax, native canvas sizing, Molstar fallback and manual viewer switch');
