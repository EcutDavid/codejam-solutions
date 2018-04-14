// Analysis link: https://codejam.withgoogle.com/2018/challenges/0000000000007883/analysis/000000000002fff7
// Data set I solved: small
// Mistake I made: I treated Wi === Hi :(

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

function solveSmall(N, P, whList) {
  const minConsume = whList.reduce((acc, d) => acc + d[0] * 2+ d[1] * 2, 0);
  whList.sort((a, b) => a[0] - b[0]);
  const extraP = P - minConsume;
  // What's the max & min result if you can cut N cookies?
  let extraConsume = 0;
  console.log('N', N)
  for (let i = 1; i <= N; i += 1) {
    console.log('head', N,whList.slice(0, i))
    console.log('tail', whList.slice(N - i, N))
    const min = whList.slice(0, i).reduce((acc, d) => acc + d[0] * 2, 0);
    const max = whList.slice(N - i, N).reduce((acc, d) => acc + d[0] * Math.sqrt(2) * 2, 0);
    console.log(min, max, extraP)
    if (min > extraP) break;

    if (extraP >= max) extraConsume = max;
    else extraConsume = Math.max(min, extraP);
  }
  return extraConsume + minConsume;
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const info = readLine().split(' ').map(Number);
    const N = info[0];
    const P = info[1];
    const whList = [];
    for (let i = 0; i < N; i++) {
      whList.push(readLine().split(' ').map(Number));
    }
    const res = solveSmall(N, P, whList);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
