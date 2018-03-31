const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});
const inputStdinArray = [];
let inputCurrentline = 0;
rl.on('line', (input) => {
  if (input === 'WRONG_ANSWER') {
    process.exit();
  }
  inputStdinArray.push(input);
});

function readLine(callback) {
  new Promise((resolve) => {
    const intervalID = setInterval(() => {
      if (inputStdinArray[inputCurrentline]) {
        resolve(inputStdinArray[inputCurrentline += 1]);
        clearInterval(intervalID);
      }
    }, 3);
  }).then(callback);
}

function solve(A, B, resolve) {
  var response;
  var guess = Math.ceil((A + B) / 2);
  console.log(guess);
  readLine().then(response => {
    if (response === 'TOO_SMALL') solve(guess, B, resolve);
    if (response === 'TOO_BIG') solve(A, guess - 1, resolve);
    if (response === 'CORRECT') resolve();
  });
}

function main() {
  readLine((caseCount) => {
    caseCount = Number(caseCount);
    let count = 1;
    const handleCase = () => {
      readLine().then((text) => {
        const numArr = text.split(' ').map(Number);
        readLine().then(() => {  // doesn't matter what the N is
          new Promise((resolve) => {
            solve(numArr[0], numArr[1], resolve);
          }).then(() => {
            if (count++ < caseCount) {
              handleCase();
            } else {
              process.exit();
            }
          })
        });
      });
    }
    handleCase();
  })
}
main();
