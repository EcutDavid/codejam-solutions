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

function solve(N, K) {
  let range = N;
  while (K) {
    const LS = Math.floor((range - 1) / 2);
    const RS = range - LS - 1;
    if (K === 1) {
      return [RS, LS].join(' ');
    }
    const KIsOdd = K % 2 === 1;
    K = Math.ceil((K - 1) / 2);
    range = KIsOdd ? LS : RS;
  }
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const info = readLine().split(' ').map(Number);
    const N = Number(info[0]);
    const K = Number(info[1]);
    const res = solve(N, K);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
