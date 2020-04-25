const fs = require('fs');
const path = require('path');

function readWasmFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let fileBuffer;

    let fileStream = fs.createReadStream(filePath);

    fileStream.once('error', (err) => {
      // console.error(err); 
      reject(err);
    });

    fileStream.once('end', () => {
      fileBuffer = Buffer.concat(chunks);
      resolve(fileBuffer);
    });
    fileStream.on('data', (chunk) => {
      chunks.push(chunk);
    });
  })
}

// function bufferToUinit8Array(buf) {
//   let ab = new ArrayBuffer(buf.length);
//   let view = new Uint8Array(ab);
//   for (let i = 0; i < buf.length; ++i) {
//     view[i] = buf[i];
//   }
//   return view;
// }

function bufferToArray(buf) {
  let arr = [];
  for (let i = 0; i < buf.length; ++i) {
    arr[i] = buf[i];
  }
  return arr;
}

function rewriteFile(filePath, content) {
  fs.writeFileSync(filePath, content)
}

async function compileWasmScript() {
  // init WASM Uint8Array
  const wasmPath = path.join(__dirname, '..', 'pkg', 'domark_bg.wasm');
  const buf = await readWasmFileAsync(wasmPath);
  const u8 = bufferToArray(buf);
  const wasmUint8ArrayCode = JSON.stringify(u8);

  // init entry script
  const wasmScriptPath = path.join(__dirname, '..', 'pkg', 'domark.js');
  let content = fs.readFileSync(wasmScriptPath, 'utf-8');
  content = content.replace('async function load(module, imports) {', `
async function load(module, imports) {
  const bytes = await module.arrayBuffer();
  return await WebAssembly.instantiate(bytes, imports);
}

async function __load(module, imports) {  
`);
  content = content.replace('async function init(input) {', `
async function init(input) {
  function fetch() {
    const buffer = new Uint8Array(${wasmUint8ArrayCode});
    const response = {
      arrayBuffer() {
        return buffer;
      }
    }
    return response;
  }
  `);
  return content;
}

async function main() {
  const script = await compileWasmScript()
  let scriptPath = path.join(__dirname, '..', 'pkg', 'wasm-entry.js');
  rewriteFile(scriptPath, script);

  let typePath = path.join(__dirname, '..', 'pkg', 'domark.d.ts');
  let typeContent = fs.readFileSync(typePath);
  let typeScriptPath = path.join(__dirname, '..', 'pkg', 'wasm-entry.d.ts');
  rewriteFile(typeScriptPath, typeContent);
}

main()


