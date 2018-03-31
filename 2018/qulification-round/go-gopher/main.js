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
        resolve(inputStdinArray[inputCurrentline ++]);
        clearInterval(intervalID);
      }
    }, 3);
  }).then(callback);
}

function depolySoil(columnCenter, rowCenter, resolve) {
  const nineSoilDict = {};
  for (let i = columnCenter - 1; i <= columnCenter + 1; i += 1) {
    for (let j = rowCenter - 1; j <= rowCenter + 1; j += 1) {
      nineSoilDict[`${j} ${i}`] = false;
    }
  }

  let counter = 0;
  const depoly = () => {
    console.log(rowCenter, columnCenter);

    readLine((res) => {
      if (res === '0 0') {
        resolve();
        return;
      }

      if (!nineSoilDict[res]) {
        counter += 1;
        nineSoilDict[res] = true;
        if (counter === 9) depolySoil(columnCenter, rowCenter + 3, resolve);
        else depoly();
      } else {
        depoly();
      }
    });
  };
  depoly();
}

function solve(soilCount, index, resolve) {
  // Since there are 1000 rows and 1000 columns,
  // Each 3*columns is more than enough for preparing 200 soils.
  const columnCenter = (index * 3) + 2;
  const rowCenter = 2;
  depolySoil(columnCenter, rowCenter, resolve);
}

function main() {
  readLine((caseCount) => {
    caseCount = Number(caseCount);
    let count = 1;
    const handleCase = () => {
      readLine((A) => {
        A = Number(A);
        new Promise((resolve) => solve(A, count, resolve)).then(() => {
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
