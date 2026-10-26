#!/usr/bin/env node
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const html=fs.readFileSync('parkin-atlas.html','utf8');
const match=html.match(/<script>\s*([\s\S]*?)<\/script>/);
assert(match,'Missing atlas script');
new vm.Script(match[1],{filename:'parkin-atlas.inline.js'});
for(const token of ['id="nativeMolecule"','id="molstarFallback"','id="switchViewer"','function useFallback(','function useClean(','viewer.resize()','if(serial===requestSerial)useFallback('])assert(html.includes(token),'Missing recovery path: '+token);
assert(!html.includes("$('.molecule-toolbar button[data-view]').forEach"),'Single-element selector cannot be iterated; viewer startup would fail');
assert(html.includes("$('.molecule-toolbar button[data-view]').forEach"),'Representation toolbar must use querySelectorAll');
console.log('PASS: atlas script syntax, native canvas sizing, Molstar fallback and manual viewer switch');
