// Solved all the cases(although I think the performance can still be improved a lot)
// Question: https://codejam.withgoogle.com/2018/challenges/0000000000007764/dashboard

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

function calcBestCase(N, langs) {
  return langs.reduce((acc, d) => acc + Math.round(d / N * 100), 0);
}

// For each more vote, the inc is obvious, this problem can be solved with greedy solution
function solve(N, langs) {
  let votesLeft = N - langs.reduce((acc, d) => acc + d, 0);
  if (votesLeft === 0) return calcBestCase(N, langs);;

  const targetLang = [];
  for (let i = 0; i < langs.length; i++) {
    const strength = langs[i] / N * 100 % 1;
    if (strength < 0.5) {
      targetLang.push({ index: i, strength: strength });
    }
  }
  targetLang.sort((a, b) => b.strength - a.strength);

  let pointer = 0;
  if (targetLang.length === 0) {
    pointer = langs.length;
    langs.push(0);
  }
  while (votesLeft) {
    let votes = 0;
    if (targetLang.length > pointer) {
      const target = targetLang[pointer];
      // Calc votes that need take to make strength bigger or equal them 0.5
      let str = (langs[target.index] / N % 0.01);
      if (str > 0.005) str = 0;
      const voteCount = Math.ceil((0.005 - str) / (1 / N % 0.01));
      votes = Math.min(voteCount, votesLeft);

      langs[target.index] += votes;
      target.strength = langs[target.index] / N * 100 % 1
      if (target.strength >= 0.5) {
        pointer++;
        if (pointer >= targetLang.length) {
          pointer = langs.length;
          langs.push(0);
        }
      }
    } else {
      langs[pointer]++;
      votes++;
      if (langs[pointer] / N * 100 % 1 >= 0.5) {
        pointer++;
        langs.push(0);
      }
    }
    votesLeft -= votes;
  }
  return calcBestCase(N, langs);
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const info = readLine().split(' ').map(Number);
    const N = info[0];
    const langs = readLine().split(' ').map(Number);
    const res = solve(N, langs);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
