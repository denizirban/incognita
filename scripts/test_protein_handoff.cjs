#!/usr/bin/env node
const fs=require('fs'),assert=require('assert');
const atlas=fs.readFileSync('parkinson-3d.html','utf8');
const viewer=fs.readFileSync('molecular-viewer.html','utf8');
assert(atlas.includes("'./molecular-viewer.html?protein='+encodeURIComponent(n.uniprot)"),'Atlas must deep link selected protein');
assert(viewer.includes("new URLSearchParams(window.location.search).get('protein')"),'Viewer must parse accession');
assert(viewer.includes("new Set(['O60260','Q9BXM7','P37840'])"),'Viewer must whitelist reference IDs');
assert(viewer.includes("loadReference()}else if(requested)"),'Viewer must load supported deep links');
assert(viewer.includes("if(!r.ok)throw Error('AlphaFold API HTTP"),'Viewer must handle reference API failure');
console.log('PASS: protein identity handoff, accession whitelist and reference-loading safeguards');
