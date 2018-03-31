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

function solveSmall(shield, code) {
  let sCount = 0;
  for (let i = 0; i < code.length; i += 1) {
    if (code[i] === 'S') sCount += 1;
  }
  if (sCount > shield) return 'IMPOSSIBLE';

  const attacks = [];
  let attackingLevel = 0;
  code.split('').forEach((d) => {
    if (d === 'C') attackingLevel += 1;
    else attacks.push(Math.pow(2, attackingLevel));
  });
  let damage = attacks.reduce((acc, d) => acc + d, 0);
  let swapCount = 0;
  while (shield < damage) {
    attacks.sort((a, b) => a - b);
    const attack = attacks.pop();
    attacks.push(attack / 2);
    damage -= attack / 2;
    swapCount += 1;
  }
  return swapCount;
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const info = readLine().split(' ');
    const res = solveSmall(Number(info[0]), info[1]);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
