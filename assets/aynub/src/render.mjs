// Renders an Aynub document source into page images.  node render.mjs <outdir> [scale] [doc=annual]
// Needs the v3 preview server on port 5176 and Google Chrome. Writes <outdir>/<n>.png (1600x900 x scale).
// Then convert to webp (see the note in annual.html) and copy into ../docs/annual/.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [out, scale = '2', doc = 'annual'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--remote-debugging-port=9351', '--hide-scrollbars', '--user-data-dir=' + out + '/.prof' + Date.now(), 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let tabs; for (let i = 0; i < 40; i++) { try { tabs = await (await fetch('http://127.0.0.1:9351/json')).json(); if (tabs.length) break; } catch {} await sleep(250); }
const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = {}; ws.onmessage = e => { const m = JSON.parse(e.data); if (pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise(r => { pend[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
const ev = async x => (await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send('Emulation.setDeviceMetricsOverride', { width: 1700, height: 1000, deviceScaleFactor: +scale, mobile: false });
await send('Page.navigate', { url: 'http://localhost:5176/assets/aynub/src/' + doc + '.html?r=' + Date.now() });
await sleep(1500);
await ev(`document.fonts.ready.then(()=>new Promise(r=>setTimeout(r,800))).then(()=>document.fonts.check('600 20px Sora')+' '+document.fonts.check('600 20px "IBM Plex Sans"'))`).then(v => console.log('fonts', v));
const rects = await ev(`[...document.querySelectorAll('.slide,.pg')].map(s=>{const b=s.getBoundingClientRect();return [s.dataset.n,b.x,b.y+scrollY,b.width,b.height]})`);
for (const [n, x, y, w, h] of rects) {
  const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x, y, width: w, height: h, scale: 1 } });
  fs.writeFileSync(`${out}/${n}.png`, Buffer.from(s.result.data, 'base64'));
}
console.log('slides', rects.length);
ws.close(); chrome.kill();
