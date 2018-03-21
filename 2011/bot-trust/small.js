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

function main() {
  var caseCount = parseInt(readLine());
  var counter = 1;
  while(caseCount--) {
    var elements = readLine().split(' ');
    var oPos = 1;
    var secondCounter = 0;
    var bPos = 1;

    var oDestQueue = [];
    var oDesPointer = 0;
    var bDestQueue = [];
    var bDesPointer = 0;
    for (var i = 1; i < elements.length; i += 2) {
      if (elements[i] === 'O') {
        oDestQueue.push(Number(elements[i + 1]));
      }
      if (elements[i] === 'B') {
        bDestQueue.push(Number(elements[i + 1]));
      }
    }

    for (var i = 1; i < elements.length; i += 2) {
      if (elements[i] === 'O') {
        var seconds = Math.abs(oPos - oDestQueue[oDesPointer]) + 1;
        secondCounter += seconds;
        oPos = oDestQueue[oDesPointer++];

        if (bPos > bDestQueue[bDesPointer]) {
          bPos -= seconds;
          bPos = Math.max(bPos, bDestQueue[bDesPointer]);
        } else if (bPos < bDestQueue[bDesPointer]){
          bPos += seconds;
          bPos = Math.min(bPos, bDestQueue[bDesPointer]);
        }
      }
      if (elements[i] === 'B') {
        var seconds = Math.abs(bPos - bDestQueue[bDesPointer]) + 1;
        secondCounter += seconds;
        bPos = bDestQueue[bDesPointer++];

        if (oPos > oDestQueue[oDesPointer]) {
          oPos -= seconds;
          oPos = Math.max(oPos, oDestQueue[oDesPointer]);
        } else if (true) {
          oPos += seconds;
          oPos = Math.min(oPos, oDestQueue[oDesPointer]);
        }
      }
    }
    console.log(`Case #${counter++}: ${secondCounter}`);
  }
}
