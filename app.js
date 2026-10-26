// Incognita — curated, illustrative biology graph. No simulated measurements.
const nodes=[
 {
  "id": "body",
  "name": "Parkinson systems",
  "type": "Disease systems atlas",
  "parent": null,
  "shape": "body",
  "x": 340,
  "y": 240,
  "color": "#b6d5ea",
  "scale": "multiscale",
  "q": "How can changes in different tissues converge on Parkinson disease?",
  "known": "Parkinson disease involves neural circuits and widespread motor and non-motor systems.",
  "unknown": "How specific molecular and systemic changes interact over time in individual patients remains unresolved.",
  "url": "https://www.nature.com/articles/s41582-026-01185-z"
 },
 {
  "id": "brain",
  "name": "Brain & basal ganglia",
  "type": "Neural system",
  "parent": "body",
  "shape": "brain",
  "x": 180,
  "y": 150,
  "color": "#c4c3e7",
  "scale": "centimetres",
  "q": "Why are substantia nigra dopamine neurons vulnerable?",
  "known": "Degeneration of substantia nigra pars compacta dopaminergic neurons disrupts basal ganglia circuitry.",
  "unknown": "Why some neurons are selectively vulnerable and which changes begin earliest.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Parkinson+substantia+nigra+selective+vulnerability"
 },
 {
  "id": "eye",
  "name": "Eye & visual system",
  "type": "Sensory system",
  "parent": "body",
  "shape": "eye",
  "x": 490,
  "y": 160,
  "color": "#9ad6e6",
  "scale": "millimetres",
  "q": "Can the retina reveal changes associated with Parkinson disease?",
  "known": "Retinal, visual and eye-movement differences have been reported in Parkinson cohorts.",
  "unknown": "Which measurements are specific and sufficiently reproducible for clinical use.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12867349/"
 },
 {
  "id": "olfactory",
  "name": "Olfactory system",
  "type": "Sensory system",
  "parent": "body",
  "shape": "neuron",
  "x": 180,
  "y": 355,
  "color": "#c5dba9",
  "scale": "millimetres",
  "q": "Why can smell change before classical motor symptoms?",
  "known": "Hyposmia is a common non-motor feature and may precede motor diagnosis.",
  "unknown": "Which pathways explain its timing and individual variability.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Parkinson+hyposmia+prodromal"
 },
 {
  "id": "autonomic",
  "name": "Autonomic & sleep",
  "type": "Regulatory system",
  "parent": "body",
  "shape": "neuron",
  "x": 490,
  "y": 355,
  "color": "#e2c4a8",
  "scale": "body-wide",
  "q": "How are sleep and autonomic regulation affected?",
  "known": "REM sleep behavior disorder and autonomic disturbances can accompany or precede Parkinson disease.",
  "unknown": "How their biological mechanisms map onto progression in each person.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Parkinson+REM+sleep+behavior+autonomic"
 },
 {
  "id": "neuron",
  "name": "Dopaminergic neuron",
  "type": "Cell",
  "parent": "brain",
  "shape": "neuron",
  "x": 205,
  "y": 240,
  "color": "#9ddac8",
  "scale": "micrometres",
  "q": "Why do dopamine-producing neurons degenerate?",
  "known": "Mitochondrial stress, proteostasis and neuronal physiology are implicated.",
  "unknown": "Their causal interactions in human disease.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Parkinson+dopaminergic+neuron"
 },
 {
  "id": "microglia",
  "name": "Microglia",
  "type": "Immune cell",
  "parent": "brain",
  "shape": "neuron",
  "x": 475,
  "y": 240,
  "color": "#bad8ad",
  "scale": "micrometres",
  "q": "When does inflammation amplify damage?",
  "known": "Microglia regulate immune surveillance and inflammatory responses.",
  "unknown": "Which responses are protective or harmful in specific contexts.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Parkinson+microglia+neuroinflammation"
 },
 {
  "id": "retina",
  "name": "Retina",
  "type": "Neural tissue",
  "parent": "eye",
  "shape": "eye",
  "x": 210,
  "y": 220,
  "color": "#a7dbe8",
  "scale": "hundreds of micrometres",
  "q": "What can retinal imaging actually measure?",
  "known": "OCT, OCT-A and electrophysiology quantify distinct aspects of retinal structure and function.",
  "unknown": "Which signals generalize across devices, age groups and disease stages.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12867349/"
 },
 {
  "id": "oculomotor",
  "name": "Eye movements",
  "type": "Neural behavior",
  "parent": "eye",
  "shape": "eye",
  "x": 485,
  "y": 220,
  "color": "#dfc2ed",
  "scale": "milliseconds",
  "q": "Can saccades or fixation reveal neural dysfunction?",
  "known": "Eye movements rely on distributed brainstem, cortical and basal ganglia circuits.",
  "unknown": "Whether specific digital gaze features are robust Parkinson biomarkers.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Parkinson+eye+tracking+saccades+biomarker"
 },
 {
  "id": "retinalcell",
  "name": "Retinal neurons",
  "type": "Cell",
  "parent": "retina",
  "shape": "neuron",
  "x": 330,
  "y": 220,
  "color": "#a7dbe8",
  "scale": "micrometres",
  "q": "How does retinal dopamine affect vision?",
  "known": "Dopaminergic signaling modulates retinal processing and adaptation.",
  "unknown": "How observed changes relate to central Parkinson pathology.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7604532/"
 },
 {
  "id": "mito",
  "name": "Mitochondrion",
  "type": "Organelle",
  "parent": "neuron",
  "shape": "mito",
  "x": 210,
  "y": 230,
  "color": "#efb7a1",
  "scale": "micrometres",
  "q": "What happens when mitochondrial quality control fails?",
  "known": "PINK1–Parkin signaling can label damaged mitochondria in experimental systems.",
  "unknown": "How strongly these mechanisms operate across human neurons in vivo.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=PINK1+Parkin+mitophagy"
 },
 {
  "id": "synuclein",
  "name": "Alpha-synuclein",
  "type": "Protein",
  "parent": "neuron",
  "shape": "protein",
  "x": 475,
  "y": 235,
  "color": "#c7b9ed",
  "scale": "nanometres",
  "q": "Which alpha-synuclein species drive toxicity?",
  "known": "Misfolding and aggregation are associated with synucleinopathy.",
  "unknown": "Which species and pathways cause damage.",
  "url": "https://www.uniprot.org/uniprotkb/P37840/entry"
 },
 {
  "id": "pink1",
  "name": "PINK1",
  "type": "Protein kinase",
  "parent": "mito",
  "shape": "protein",
  "x": 160,
  "y": 180,
  "color": "#d1b9ef",
  "scale": "nanometres",
  "q": "How does PINK1 sense damaged mitochondria?",
  "known": "PINK1 accumulates at depolarized mitochondria and can phosphorylate ubiquitin.",
  "unknown": "Its regulation across physiological contexts.",
  "url": "https://www.uniprot.org/uniprotkb/Q9BXM7/entry"
 },
 {
  "id": "parkin",
  "name": "Parkin / PRKN",
  "type": "E3 ubiquitin ligase",
  "parent": "mito",
  "shape": "protein",
  "x": 475,
  "y": 180,
  "color": "#9edbd6",
  "scale": "nanometres",
  "q": "How does Parkin change from inhibited to active?",
  "known": "Phosphorylation and phospho-ubiquitin contribute to activation.",
  "unknown": "How variants reshape this mechanism in cells.",
  "url": "https://www.uniprot.org/uniprotkb/O60260/entry"
 },
 {
  "id": "mitophagy",
  "name": "Mitophagy",
  "type": "Cellular process",
  "parent": "parkin",
  "shape": "mito",
  "x": 340,
  "y": 240,
  "color": "#b8d6b0",
  "scale": "cellular",
  "q": "How are damaged mitochondria removed?",
  "known": "PINK1–Parkin signaling can promote mitochondrial quality control.",
  "unknown": "Its in-vivo importance across patient subgroups.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/?term=PINK1+Parkin+mitophagy+in+vivo"
 }
];
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],by=id=>nodes.find(n=>n.id===id),children=id=>nodes.filter(n=>n.parent===id);
let context='body',selected='brain',tab='unknown';const saved=new Set();
const NS='http://www.w3.org/2000/svg';function el(tag,attrs={}){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e}
function circle(g,x,y,r,fill,opacity=1){g.append(el('circle',{cx:x,cy:y,r,fill,opacity}))}
function draw(n){const g=el('g'),{x,y,color:c,shape}=n;const dots=(count,rx,ry)=>{for(let i=0;i<count;i++){const a=i*2.39996,d=Math.sqrt((i+.5)/count);circle(g,x+Math.cos(a)*d*rx,y+Math.sin(a)*d*ry,2.6+i%4*.65,c,.75+i%3*.08)}};
if(shape==='brain'){dots(150,57,42);g.append(el('path',{d:`M${x} ${y-40}Q${x-10} ${y} ${x+2} ${y+40}`,stroke:'#d8cce9','stroke-width':2,fill:'none'}))}
else if(shape==='neuron'){for(let j=0;j<8;j++){const a=j*Math.PI/4;g.append(el('path',{d:`M${x} ${y} Q${x+Math.cos(a+.25)*46} ${y+Math.sin(a+.25)*46} ${x+Math.cos(a)*86} ${y+Math.sin(a)*86}`,stroke:c,'stroke-width':2.5,fill:'none',opacity:.8}))}dots(85,30,30)}
else if(shape==='mito'){const p=el('g',{transform:`rotate(-22 ${x} ${y})`});p.append(el('rect',{x:x-77,y:y-38,width:154,height:76,rx:38,fill:c,'fill-opacity':.12,stroke:c,'stroke-width':3}));for(let i=0;i<4;i++)p.append(el('path',{d:`M${x-55+i*31} ${y-25}Q${x-35+i*31} ${y} ${x-55+i*31} ${y+25}`,stroke:c,'stroke-width':4,fill:'none'}));g.append(p)}
else if(shape==='eye'){g.append(el('ellipse',{cx:x,cy:y,rx:77,ry:43,fill:c,'fill-opacity':.10,stroke:c,'stroke-width':3}));circle(g,x,y,27,c,.7);circle(g,x,y,13,'#0d1b2a',1);for(let i=0;i<20;i++){const a=i*2.39996;circle(g,x+Math.cos(a)*49,y+Math.sin(a)*24,2.4,c,.8)}}
else if(shape==='heart'){g.append(el('path',{d:`M${x} ${y+58}C${x-108} ${y-13} ${x-52} ${y-83} ${x} ${y-35}C${x+52} ${y-83} ${x+108} ${y-13} ${x} ${y+58}Z`,stroke:c,'stroke-width':3,fill:c,'fill-opacity':.22}));dots(65,27,25)}
else if(shape==='gut'){g.append(el('rect',{x:x-67,y:y-75,width:134,height:150,rx:45,fill:'none',stroke:c,'stroke-width':3}));for(let j=0;j<6;j++)g.append(el('path',{d:`M${x-44} ${y-52+j*18}Q${x+56} ${y-34+j*18} ${x-40} ${y-16+j*18}`,stroke:c,'stroke-width':3,fill:'none'}))}
else if(shape==='body'){g.append(el('circle',{cx:x,cy:y-102,r:26,fill:'none',stroke:c,'stroke-width':3}));g.append(el('path',{d:`M${x-24} ${y-69}L${x-60} ${y-44}L${x-85} ${y+32}L${x-72} ${y+37}L${x-39} ${y-15}L${x-32} ${y+46}L${x-23} ${y+138}L${x-7} ${y+138}L${x} ${y+56}L${x+7} ${y+138}L${x+23} ${y+138}L${x+32} ${y+46}L${x+39} ${y-15}L${x+72} ${y+37}L${x+85} ${y+32}L${x+60} ${y-44}L${x+24} ${y-69}Z`,fill:c,'fill-opacity':.13,stroke:c,'stroke-width':3}))}
else if(shape==='atps'){for(let i=0;i<180;i++){let a=i*.29;circle(g,x+Math.cos(a*1.1)*(24+19*Math.sin(a*.3)),y+Math.sin(a*.9)*60,2.7+i%4*.5,c,.8)}}
else if(shape==='atp'){for(let i=0;i<26;i++){const a=i*2.39996,d=Math.sqrt((i+.5)/26);circle(g,x+Math.cos(a)*d*62,y+Math.sin(a)*d*45,5+i%3,c,.85)}}
else if(shape==='protein'){for(let i=0;i<165;i++){const a=i*.26;const rr=22+20*Math.sin(i*.13)+8*Math.cos(i*.41);circle(g,x+Math.cos(a)*rr,y+Math.sin(a)*rr*.85,3.3+(i%4)*.7,['#a6d9ef','#b8a6e7','#e2b2a7','#a7d9c3'][i%4],.94)}}else dots(180,56,56);return g}
function navigate(id){const n=by(id);if(!n)return;context=n.parent||'body';selected=id;tab='unknown';render()}
function enter(){const arr=children(selected);if(!arr.length)return;context=selected;selected=arr[0].id;tab='unknown';render()}
function outward(){if(context==='body')return;const old=context;context=by(old).parent;selected=old;tab='unknown';render()}
function chip(text,handler,active=false){const b=document.createElement('button');b.className='chip'+(active?' active':'');b.textContent=text;b.addEventListener('click',handler);return b}
function render(){const c=by(context),n=by(selected),arr=children(context);$('#contextName').textContent=c.name;$('#contextType').textContent=c.type.toUpperCase();$('#scale').textContent='SCALE / '+c.scale;const art=$('#art');art.replaceChildren();arr.forEach(item=>{const g=el('g',{role:'button',tabindex:0,'aria-label':'Select '+item.name,style:'cursor:pointer'});g.append(el('circle',{cx:item.x,cy:item.y,r:95,fill:'transparent'}));if(item.id===selected)g.append(el('circle',{cx:item.x,cy:item.y,r:91,fill:'none',stroke:'#d7ebf9','stroke-dasharray':'3 7','stroke-opacity':.6}));g.append(draw(item));const label=el('text',{x:item.x,y:item.y+105,'text-anchor':'middle',fill:'#e7f2fa','font-size':15});label.textContent=item.name;g.append(label);g.addEventListener('click',()=>{selected=item.id;tab='unknown';render()});g.addEventListener('dblclick',()=>{selected=item.id;enter()});g.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();selected=item.id;render()}});art.append(g)});
const choices=$('#choices');choices.replaceChildren(...arr.map(item=>chip(item.name,()=>{selected=item.id;tab='unknown';render()},item.id===selected)));
$('#nodeName').textContent=n.name;$('#nodeType').textContent=n.type.toUpperCase();$('#question').textContent=n.q;$('#save').textContent=saved.has(n.id)?'★ Saved':'☆ Save';all('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));const body=$('#detailBody');body.replaceChildren();if(tab==='evidence'){const p=document.createElement('p');p.textContent='Curated reference and research entry point. This prototype does not assign a quantitative evidence grade.';body.append(p);const a=document.createElement('a');a.href=n.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Open scientific reference ↗';body.append(a)}else body.textContent=n[tab];
$('#children').replaceChildren(...children(n.id).map(item=>chip(item.name+' →',()=>{context=n.id;selected=item.id;tab='unknown';render()})));if(!children(n.id).length)$('#children').textContent='No deeper model in this prototype.';
$('#enter').disabled=$('#zoomIn').disabled=!children(n.id).length;$('#back').disabled=$('#zoomOut').disabled=context==='body';const chain=[];let p=context;while(p){chain.unshift(by(p));p=by(p).parent}$('#breadcrumbs').replaceChildren(...chain.map(item=>chip(item.name,()=>{context=item.id;selected=children(item.id)[0]?.id||item.id;render()},item.id===context)));$('#savedCount').textContent=saved.size?Array.from(saved).map(id=>by(id).name).join(' · '):'None yet'}
$('#zoomIn').onclick=$('#enter').onclick=enter;$('#zoomOut').onclick=$('#back').onclick=outward;$('#reset').onclick=()=>{context='body';selected='brain';render()};$('#save').onclick=()=>{saved.has(selected)?saved.delete(selected):saved.add(selected);render()};all('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});
let wheelTimeout=0;$('#scene').addEventListener('wheel',e=>{e.preventDefault();const now=Date.now();if(now-wheelTimeout<420)return;wheelTimeout=now;e.deltaY>0?enter():outward()},{passive:false});$('#scene').addEventListener('keydown',e=>{if(['ArrowDown','+','='].includes(e.key)){e.preventDefault();enter()}if(['ArrowUp','-'].includes(e.key)){e.preventDefault();outward()}if(e.key==='Home'){e.preventDefault();context='body';selected='brain';render()}});
all('.nav').forEach(b=>b.onclick=()=>{all('.nav').forEach(n=>n.classList.toggle('active',n===b));all('.view').forEach(v=>v.classList.toggle('hidden',v.id!==b.dataset.view));$('#headline').textContent=b.dataset.view==='explore'?'The universe within.':b.dataset.view==='lab'?'A molecular detective story.':'How do we know?';$('#subhead').textContent=b.dataset.view==='explore'?'From the human body to the molecular machines that keep us alive. Explore a structure, follow a mechanism, question the evidence.':b.dataset.view==='lab'?'Explore the PINK1–Parkin pathway and design a reproducible molecular simulation experiment.':'Every scientific claim needs an observation, a model and a test.';window.scrollTo({top:0,behavior:'smooth'})});
const steps=[['01','Mitochondrial stress','A mitochondrion loses membrane potential.'],['02','PINK1 stabilization','PINK1 accumulates at the impaired outer membrane.'],['03','Ubiquitin signaling','PINK1 phosphorylates ubiquitin and Parkin.'],['04','Parkin activation','Parkin promotes ubiquitination of outer-membrane proteins.'],['05','Quality control','Downstream clearance can follow, depending on context.']];$('#pathway').replaceChildren(...steps.flatMap((s,i)=>{const d=document.createElement('div');d.className='path-step';const strong=document.createElement('strong');strong.textContent=s[0]+' / '+s[1];const small=document.createElement('small');small.textContent=s[2];d.append(strong,small);if(!i)return[d];const arrow=document.createElement('span');arrow.className='path-arrow';arrow.textContent='→';return[arrow,d]}));
const proteins={parkin:['Parkin / PRKN','E3 ubiquitin-protein ligase; human UniProt O60260.','O60260'],pink1:['PINK1','Serine/threonine protein kinase; human UniProt Q9BXM7.','Q9BXM7'],snca:['Alpha-synuclein / SNCA','Presynaptic protein associated with synucleinopathies; human UniProt P37840.','P37840']};$('#proteinSelect').onchange=e=>{const [title,desc,id]=proteins[e.target.value];$('#proteinTitle').textContent=title;$('#proteinDescription').textContent=desc;$('#uniprot').href='https://www.uniprot.org/uniprotkb/'+id+'/entry';$('#molstar').href='https://molstar.org/viewer/?afdb='+id};
$('#exportPlan').onclick=()=>{const v=$('#variant').value.trim();const plan={project:'Incognita Parkin Research Lab',status:'PROPOSED — NOT RUN',protein:'PRKN / UniProt O60260',variant:v||'NOT SPECIFIED',simulation_ns:Number($('#duration').value),replicates:Number($('#replicates').value),question:'How does a selected PRKN variant alter conformational dynamics relative to wild type?',requirements:['Verify variant against canonical sequence and disease literature','Select experimentally grounded or confidence-assessed structure','Evaluate unresolved loops, cofactors, protonation and relevant activation state','Prepare comparable WT and variant systems with explicit solvent and ionic conditions','Run energy minimization, equilibration and independent production replicates','Pre-register RMSD, RMSF, domain contacts and convergence diagnostics','Use controls and do not infer clinical pathogenicity from MD alone'],engine:'OpenMM (planned)',results:null};const blob=new Blob([JSON.stringify(plan,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='incognita-parkin-experiment-plan.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
render();