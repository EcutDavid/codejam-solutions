process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function solve(cakes, flipRange, pointer) {
  pointer = pointer ? pointer : 0;
  while ((pointer < cakes.length) && cakes[pointer]) {
    pointer++;
  }
  if (pointer === cakes.length) {
    return 0;
  }
  if ((pointer + flipRange) > cakes.length) {
    return 'IMPOSSIBLE';
  }
  for (var i = 0; i < flipRange; i++) {
    cakes[pointer + i] = !cakes[pointer + i];
  }
  var res = solve(cakes, flipRange, pointer);
  if (res === 'IMPOSSIBLE') {
    return res;
  }
  return 1 + res;
}

function main() {
  var caseCount = parseInt(readLine());
  var counter = 1;
  while(caseCount--) {
    var [cakes, flipRange] = readLine().split(' ')
    cakes = cakes.split('').map(d => d === '+' ? true : false);
    flipRange = parseInt(flipRange);
    var res = solve(cakes, flipRange);
    console.log(`Case #${counter++}: ${res}`)
  }
}
