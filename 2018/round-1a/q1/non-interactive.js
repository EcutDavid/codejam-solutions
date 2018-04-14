// Analysis link: https://codejam.withgoogle.com/2018/challenges/0000000000007883/analysis/000000000003005a
// Data set I solved: small
// Mistake I made: didn't observe that for each cutted line, the choc count should be N / V

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

function solveSmall(chocList, rowCount, colCount, H, V) {
  let chocCount = 0;
  chocList.forEach(list => list.forEach(d => d && (chocCount += 1)));
  if (chocCount % 4 !== 0) return 'IMPOSSIBLE';

  const expectedBlockCount = chocCount / 4;
  for (let i = 1; i < rowCount; i += 1) {
    for (let j = 1; j < colCount; j += 1) {
      let blockCount = 0;
      for (let k = 0; k < i; k += 1) {
        for (let w = 0; w < j; w += 1) {
          blockCount += chocList[k][w] ? 1 : 0;
        }
      }
      if (blockCount !== expectedBlockCount) continue;

      blockCount = 0;
      for (let k = 0; k < i; k += 1) {
        for (let w = j; w < colCount; w += 1) {
          blockCount += chocList[k][w] ? 1 : 0;
        }
      }
      if (blockCount !== expectedBlockCount) continue;

      blockCount = 0;
      for (let k = i; k < rowCount; k += 1) {
        for (let w = 0; w < j; w += 1) {
          blockCount += chocList[k][w] ? 1 : 0;
        }
      }
      if (blockCount !== expectedBlockCount) continue;

      return 'POSSIBLE';
    }
  }

  return 'IMPOSSIBLE';
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const info = readLine().split(' ').map(Number);
    const rowCount = info[0];
    const colCount = info[1];
    const H = info[2];
    const V = info[3];
    const chocList = [];
    for (let i = 0; i < rowCount; i++) {
      chocList.push(readLine().split('').map(d => d === '@'));
    }
    const res = solveSmall(chocList, rowCount, colCount, H, V);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
