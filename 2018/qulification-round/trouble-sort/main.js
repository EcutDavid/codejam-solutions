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

class Heap {
  static left(index) {
    return (index * 2) + 1;
  }

  static right(index) {
    return (index * 2) + 2;
  }

  static parent(index) {
    return Math.floor((index - 1) / 2);
  }
}

class MinHeap {
  constructor() {
    this.arr = [];
  }

  swap(indexA, indexB) {
    const tmp = this.arr[indexA];
    this.arr[indexA] = this.arr[indexB];
    this.arr[indexB] = tmp;
  }

  heapify(index) {
    let parentIndex = Heap.parent(index);
    while (parentIndex > -1 && this.arr[parentIndex].key > this.arr[index].key) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Heap.parent(index);
    }
  }

  insert(item) {
    this.arr.push(item);
    this.heapify(this.arr.length - 1);
  }

  extractMin() {
    const min = this.getMin();
    this.delete(this.arr[0].key);
    return min;
  }

  delete(key) {
    let index;
    for (let i = 0; i < this.arr.length; i += 1) {
      if (this.arr[i].key === key) {
        index = i;
        break;
      }
    }
    if (index === undefined) return;
    if (index === (this.arr.length - 1)) {
      this.arr.pop();
      return;
    }

    this.arr[index] = this.arr.pop();
    let leftChildIndex = Heap.left(index);
    let rightChildIndex = Heap.right(index);
    while (leftChildIndex < this.arr.length) {
      const targetKey = this.arr[index].key;
      const leftChildKey = this.arr[leftChildIndex].key;
      if (rightChildIndex < this.arr.length) {
        const rightChildKey = this.arr[rightChildIndex].key;
        if (Math.min(leftChildKey, rightChildKey) > targetKey) break;

        if (leftChildKey > rightChildKey) {
          this.swap(rightChildIndex, index);
          index = rightChildIndex;
        } else {
          this.swap(leftChildIndex, index);
          index = leftChildIndex;
        }
        leftChildIndex = Heap.left(index);
        rightChildIndex = Heap.right(index);
      } else {
        if (leftChildKey < targetKey) this.swap(leftChildIndex, index);
        break;
      }
    }
  }

  decreaseKey(val, newKey) {
    const index = this.arr.findIndex(d => d.val === val);
    if (index >= 0) {
      this.arr[index].key = newKey;
      this.heapify(index);
    }
  }

  getMin() {
    return this.arr[0];
  }
}

function solveSmall(arr) {
  const evenIndexHeap = new MinHeap();
  const oddIndexHeap = new MinHeap();
  for (let i = 0; i < arr.length; i += 2) evenIndexHeap.insert({ key: arr[i] });
  for (let i = 1; i < arr.length; i += 2) oddIndexHeap.insert({ key: arr[i] });
  let index = 0;
  while (evenIndexHeap.arr.length && oddIndexHeap.arr.length) {
    const evenItem = evenIndexHeap.extractMin().key;
    const oddItem = oddIndexHeap.extractMin().key;
    if (evenItem > oddItem) return index;
    if (evenIndexHeap.arr.length && (oddItem > evenIndexHeap.getMin().key)) return index + 1;
    index += 2;
  }
  return 'OK';
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    readLine();
    const list = readLine().split(' ').map(Number);
    const res = solveSmall(list);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
