#!/usr/bin/env node
'use strict';
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const html=fs.readFileSync('parkin-atlas.html','utf8');
const match=html.match(/<script>\s*([\s\S]*?)<\/script>/);
assert(match,'Missing inline atlas script');
new vm.Script(match[1],{filename:'parkin-atlas.inline.js'});
const required=[
  'id="nativeMolecule"',
  'id="molstarFallback"',
  'class="viewport fallback-mode"',
  'function useFallback(',
  'function useClean(',
  'viewer.resize()',
  'if(serial===requestSerial)useFallback(',
  "document.querySelector('.viewport').classList.remove('fallback-mode')",
  "backgroundColor:'#0c1420'",
  "viewer.getModel().setStyle({},styles[viewStyle])",
  "document.querySelectorAll('.molecule-toolbar button[data-view]').forEach",
  "b.addEventListener('click',",
  "viewStyle=b.dataset.view",
  "setState('Representation: '",
  "if($('#protein').value!=='O60260')return"
];
for(const token of required)assert(html.includes(token),'Missing viewer safeguard: '+token);
assert(!html.includes("$$$('"),'Triple dollar selector is invalid');
assert(!html.includes("$('.molecule-toolbar button[data-view]').forEach"),'Cannot iterate a single element');
assert(!html.includes('.viewport.fallback-mode #nativeMolecule{display:none}'),'Do not initialize hidden WebGL');
console.log('PASS: atlas syntax, viewer recovery, protein styles, button interactions');
