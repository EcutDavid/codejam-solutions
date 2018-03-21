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

class priorityQueue {
  constructor() {
    this.queue = [];
  }

  insert(n) {
    var counter = 0;
    while(counter < this.queue.length && this.queue[counter] > n) {
      counter++;
    }
    this.queue = this.queue.slice(0, counter).concat(n).concat(this.queue.slice(counter));
  }

  extract() {
    return this.queue.shift();
  }
}

function solve(n, k) {
  var pq = new priorityQueue();
  pq.insert(n);
  var max;
  var min;
  while(k--) {
    var range = pq.extract();
    min = Math.floor((range - 1) / 2);
    max = Math.floor(range / 2);
    !!min && pq.insert(min);
    !!max && pq.insert(max);
  }
  return [max, min];
}

function main() {
  var caseCount = parseInt(readLine());
  var counter = 1;
  while(caseCount--) {
    var [n, k] = readLine().split(' ').map(d => parseInt(d));
    var [max, min] = solve(n, k);
    console.log(`Case #${counter++}: ${max} ${min}`)
  }
}
