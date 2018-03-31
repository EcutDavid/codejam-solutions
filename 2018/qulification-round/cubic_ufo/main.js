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

function rotateZ(points, angle) {
  const transforms = [
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1],
  ];
  const newArr = [];
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const newPoint = [];
    for (let j = 0; j < points[0].length; j += 1) {
      newPoint.push(
        transforms[j].reduce((acc, d, k) => acc + (d * point[k]), 0)
      );
    }
    newArr.push(newPoint);
  }
  return newArr;
}

function rotateX(points, angle) {
  const transforms = [
    [1, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle)],
    [0, Math.sin(angle), Math.cos(angle)],
  ];
  const newArr = [];
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const newPoint = [];
    for (let j = 0; j < points[0].length; j += 1) {
      newPoint.push(
        transforms[j].reduce((acc, d, k) => acc + (d * point[k]), 0)
      );
    }
    newArr.push(newPoint);
  }
  return newArr;
}

// Doesn't solves the large input :(
function solveSmall(A) {
  // sqrt(2) * sin(angle + PI / 4) = A for small case
  // const rotation = Math.asin((A / Math.sqrt(2))) - (Math.PI / 4);
  // 0.6154797086703874: asin(1/sqrt(3))
  // Map to 0 -> PI / 4,
  const rotation = (Math.asin((A / Math.sqrt(3))) - 0.6154797086703874)
    * (Math.PI / 4) / ((Math.PI / 2) - 0.6154797086703874);
  const centers = [
    [0.5, 0, 0],
    [0, 0.5, 0],
    [0, 0, 0.5],
  ];
  return rotateX(rotateZ(centers, rotation), rotation);
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    const A = Number(readLine());
    const res = solveSmall(A);
    console.log(`Case #${counter}:`);
    res.forEach((d) => {
      console.log(d.join(' '));
    });
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
