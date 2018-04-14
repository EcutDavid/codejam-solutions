"use strict"
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});
const inputStdinArray = [];
let inputCurrentline = 0;
rl.on('line', (input) => {
  if (input === '-1 -1') {
    process.exit();
  }
  inputStdinArray.push(input);
});

function readLine(callback) {
  new Promise((resolve) => {
    const intervalID = setInterval(() => {
      if (inputStdinArray[inputCurrentline]) {
        resolve(inputStdinArray[inputCurrentline++]);
        clearInterval(intervalID);
      }
    }, 3);
  }).then(callback);
}

function solve(maybeSomething, index, resolve) {

}

function main() {
  readLine((caseCount) => {
    caseCount = Number(caseCount);
    let count = 1;
    const handleCase = () => {
      readLine((A) => {
        // A = Number(A);
        new Promise((resolve) => solve(undefined, count, resolve)).then(() => {
          if (count < caseCount) {
            handleCase();
            count += 1;
          } else process.exit();
        });
      });
    };
    handleCase();
  });
}
main();
