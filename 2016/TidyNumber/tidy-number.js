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

function isTidyNumber(n) {
    var sub = n % 10;
    while (n > 9) {
      n -= sub;
      n /= 10;
      var newSub = n % 10;
      if (newSub > sub) {
        return false;
      }
      sub = n % 10;
    }
    return true;
}

function main() {
  var caseCount = parseInt(readLine());
  var counter = 1;
  while (caseCount--) {
    n = parseInt(readLine());
    while(!isTidyNumber(n)) {
      n--;
    }
    process.stdout.write(`Case #${counter++}: ${n}\n`);
  }
}
