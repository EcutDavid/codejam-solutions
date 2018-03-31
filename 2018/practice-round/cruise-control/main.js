"use strict"

process.stdin.resume();
process.stdin.setEncoding('ascii');

let inputStdin = '';
let inputStdinArray = [];
let inputCurrentLine = 0;

process.stdin.on('data', (data) => {
  inputStdin += data;
});

process.stdin.on('end', () => {
  inputStdinArray = inputStdin.split('\n');
  main();
});

function readLine() {
  inputCurrentLine += 1;
  return inputStdinArray[inputCurrentLine - 1];
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    let info = readLine().split(' ').map(Number);
    const dest = info[0];
    let horseCount = info[1];
    const horses = [];
    while (horseCount) {
      info = readLine().split(' ').map(Number);
      horses.push({ speed: info[1], pos: info[0] });
      horseCount -= 1;
    }
    const timeList = horses.map(d => (dest - d.pos) / d.speed).sort((a, b) => b - a);
    console.log(`Case #${counter}: ${dest / timeList[0]}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
