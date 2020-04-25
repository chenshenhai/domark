
import init, { greet } from './../pkg/wasm-entry';

async function main() {
  await init();
  greet();
}

main();

// console.log('i am ts', wasm)