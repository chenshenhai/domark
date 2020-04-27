
import init, { start } from '../pkg/wasm-entry';

async function main() {
  await init();
  start('canvas');
}

main();

// console.log('i am ts', wasm)