// Solved only the small case
// Question: https://codejam.withgoogle.com/2018/challenges/0000000000007764/dashboard/000000000003675b

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

// This is a typical DP question
function solve(stops) {
  const mnList = [];
  stops.forEach((d) => {
    mnList.push([d[0] + d[1], d[0] - d[2]]);
  });
  const resultList = [];
  for (let i = 0; i < stops.length; i++) {
    const guess = (m, n, length, jStart) => {
      for (let j = jStart; j < stops.length; j++) {
        if ((m === undefined) && (n === undefined)) {
          if ((mnList[j - 1][0] === mnList[j][0]) && (mnList[j - 1][1] === mnList[j][1])) {
            length++;
            continue;
          }
          if ((mnList[j - 1][0] !== mnList[j][0]) && (mnList[j - 1][1] !== mnList[j][1])) {
            const guess1 = guess(mnList[j - 1][0], mnList[j][1], length + 1, j + 1);
            const guess2 = guess(mnList[j][0], mnList[j - 1][1], length + 1, j + 1);
            return guess1 > guess2 ? guess1 : guess2;
          }
          if ((mnList[j - 1][0] === mnList[j][0])) {
            length++;
            m = mnList[j][0];
            continue;
          }
          if ((mnList[j - 1][1] === mnList[j][1])) {
            length++;
            n = mnList[j][1];
            continue;
          }
        } else if ((m !== undefined) && (n === undefined)) {
          if (m === mnList[j][0]) {
            length++;
            continue;
          } else {
            length++;
            n = mnList[j][1];
            continue;
          }
        } else if ((m === undefined) && (n !== undefined)) {
          if (n === mnList[j][1]) {
            length++;
            continue;
          } else {
            length++;
            m = mnList[j][0];
            continue;
          }
        } else if ((m !== undefined) && (n !== undefined)) {
          if ((n === mnList[j][1]) || (m === mnList[j][0])) {
            length++;
            continue;
          } else {
            break;
          }
        }
      }
      return length;
    }
    resultList.push(guess(undefined, undefined, 1, i + 1));
  }
  resultList.sort((a, b) => b - a);
  const top = resultList[0];
  const count = resultList.filter(d => d === top).length;
  return [top, count].join(' ');
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    let N = Number(readLine());
    const stops = [];
    while (N--) {
      stops.push(readLine().split(' ').map(Number));
    }
    const res = solve(stops);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
