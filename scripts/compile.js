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

async function main() {
  const wasmPath = path.join(__dirname, '..', 'pkg', 'domark_bg.wasm');
  const buf = await readWasmFileAsync(wasmPath);
  const u8 = bufferToArray(buf);
  const wasmJsonPath = path.join(__dirname, '..', 'pkg', 'wasm_u8.json');
  const content = JSON.stringify(u8);
  rewriteFile(wasmJsonPath, content);
}

main()


