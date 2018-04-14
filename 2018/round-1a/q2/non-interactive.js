// Analysis link: https://codejam.withgoogle.com/2018/challenges/0000000000007883/analysis/000000000002fff6
// Data set I solved: small

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

// cashiersInfo: [[M, S, P, inQueue, oldTime]]
// inQueue representes there is a robat on the line.
// oldTime representes the time has already been spent in the cashier side
//                                  (if we decide to use that cashier)
function solveSmall(R, B, cashiersInfo) {
  if (B === 0) return 0;
  // What's the optimal choice to buy one bit?
  const choices = cashiersInfo
    .filter((d) => {
      // No extra robot, so we have to use the ones already in queue.
      if (R === 0) return d[3] && (d[0] > 0);
      return d[0] > 0;
    }).sort((a, b) => ((a[1] + a[2] + a[4]) - (b[1] + b[2] + b[4])) * Math.pow(10, 9) + a[1] - b[1]);

  const bestChoice = choices[0];

  const time = bestChoice[1] + bestChoice[2] + bestChoice[4];
  if (!bestChoice[3]) {
    R -= 1;
    bestChoice[3] = true;
    bestChoice[2] = 0;
  }
  bestChoice[0] -= 1;
  bestChoice[4] = time;
  B -= 1;

  return Math.max(time, solveSmall(R, B, cashiersInfo));
}

function calcCombines(R, B, cashiersInfo, comb, res) {
  if (cashiersInfo.length + comb.length < R) return;
  if (comb.length === R) {
    if (comb.reduce((acc, d) => acc + d[0], 0) >= B) res.push(JSON.parse(JSON.stringify(comb)));
    return;
  }
  calcCombines(R, B, cashiersInfo.slice(1), JSON.parse(JSON.stringify(comb)).concat([cashiersInfo[0]]), res);
  calcCombines(R, B, cashiersInfo.slice(1), JSON.parse(JSON.stringify(comb)), res);
}

function solve(R, B, cashiersInfo) {
  cashiersInfo.sort((a, b) => a[0] - b[0]);
  if (R === B) return solveSmall(R, B, cashiersInfo);
  // Find all the cashiers comb that their total M >= B
  const res = [];
  calcCombines(R, B, cashiersInfo, [], res);
  let min = Number.MAX_VALUE;
  res.forEach((d) => {
    min = Math.min(min, solveSmall(R, B, d));
  });
  return min;
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const info = readLine().split(' ').map(Number);
    const R = info[0];
    const B = info[1];
    const C = info[2];
    const cashiersInfo = [];
    for (let i = 0; i < C; i += 1) {
      const cashierInfo = readLine().split(' ').map(Number);
      cashierInfo[3] = false;
      cashierInfo[4] = 0;
      cashiersInfo.push(cashierInfo);
    }
    const res = solve(R, B, cashiersInfo);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
