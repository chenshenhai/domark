const fs = require('fs');
const path = require('path');


const wasmPath = path.join(__dirname, '..', 'pkg', 'domark_bg.wasm');
const wasmFile = fs.readFileSync(wasmPath);


const wasm = new WebAssembly.Module(wasmFile, {});

module.exports = new WebAssembly.Instance(wasm, {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 256,
      maximum: 512,
    }),
    table: new WebAssembly.Table({
      initial: 0,
      maximum: 0,
      element: 'anyfunc',
    }),
    abort: console.log,
  },
}).exports;