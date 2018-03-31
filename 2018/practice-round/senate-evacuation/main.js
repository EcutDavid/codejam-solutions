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

class MaxHeap {
  constructor() {
    this.arr = [];
  }

  static left(index) {
    return (index * 2) + 1;
  }

  static right(index) {
    return (index * 2) + 2;
  }

  static parent(index) {
    return Math.floor((index - 1) / 2);
  }

  swap(indexA, indexB) {
    const tmp = this.arr[indexA];
    this.arr[indexA] = this.arr[indexB];
    this.arr[indexB] = tmp;
  }

  insert(item) {
    this.arr.push(item);
    let index = this.arr.length - 1;
    let parentIndex = MaxHeap.parent(index);
    while (parentIndex > -1 && this.arr[parentIndex].key < this.arr[index].key) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = MaxHeap.parent(index);
    }
  }

  extractMax() {
    const max = this.getMax();
    this.delete(this.arr[0].key);
    return max;
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
    let leftChildIndex = MaxHeap.left(index);
    let rightChildIndex = MaxHeap.right(index);
    while (leftChildIndex < this.arr.length) {
      const targetKey = this.arr[index].key;
      const leftChildKey = this.arr[leftChildIndex].key;
      if (rightChildIndex < this.arr.length) {
        const rightChildKey = this.arr[rightChildIndex].key;
        if (Math.max(leftChildKey, rightChildKey) < targetKey) {
          break;
        } else if (leftChildKey < rightChildKey) {
          this.swap(rightChildIndex, index);
          index = rightChildIndex;
        } else {
          this.swap(leftChildIndex, index);
          index = leftChildIndex;
        }
        leftChildIndex = MaxHeap.left(index);
        rightChildIndex = MaxHeap.right(index);
      } else {
        if (leftChildKey > targetKey) this.swap(leftChildIndex, index);
        break;
      }
    }
  }

  getMax() {
    return this.arr[0];
  }

  extractTopTwo() {
    if (this.arr.length === 1) return [this.extractMax()];
    return [this.extractMax(), this.extractMax()];
  }
}

const A_CHAR_CODE = 'A'.charCodeAt(0);

function solve(parties) {
  const heap = new MaxHeap();
  parties.forEach((d, i) => heap.insert({ key: d, val: i }));
  const res = [];
  while (heap.arr.length) {
    const topTwo = heap.extractTopTwo();
    const a = topTwo[0];
    const b = topTwo[1];
    // Four kinds of situations
    // A: the top two group have the same count
    //    A1: the count is 1, and there are more than 2 groups, just move the first item.
    //    A2: move one from both top two.
    // B: move 2 people from first group
    if (a.key === b.key) {
      if (a.key === 1) {
        if (heap.arr.length > 0) {
          res.push([a.val]);
          heap.insert({ key: b.key, val: b.val });
        } else {
          res.push([a.val, b.val]);
        }
      } else {
        res.push([a.val, b.val]);
        heap.insert({ key: a.key - 1, val: a.val });
        heap.insert({ key: b.key - 1, val: b.val });
      }
    } else {
      res.push([a.val, a.val]);
      heap.insert({ key: b.key, val: b.val });
      if (a.key > 2) {
        heap.insert({ key: a.key - 2, val: a.val });
      }
    }
  }
  return res.map(arr => arr.map(d => String.fromCharCode(A_CHAR_CODE + d)).join('')).join(' ');
}

function solveSmall(parties) {
  const arr = parties.map((d, i) => ({ count: d, index: i }));
  const res = [];
  arr.sort((a, b) => b.count - a.count);
  while (arr[0].count > 0) {
    // Three kinds of situations
    // A: the top two group have the same count
    //    A1: the count is 1, and there are more than 2 groups, just move the first item.
    //    A2: move one from both top two.
    // B: move 2 people from first group
    if (arr[0].count === arr[1].count) {
      // If all the items are 1, just delete 1 instead of 2.
      if ((arr[0].count === 1) && (arr[2] && arr[2].count)) {
        res.push([arr[0].index]);
        arr[0].count -= 1;
      } else {
        res.push([arr[0].index, arr[1].index]);
        arr[0].count -= 1;
        arr[1].count -= 1;
      }
    } else {
      res.push([arr[0].index, arr[0].index]);
      arr[0].count -= 2;
    }
    arr.sort((a, b) => b.count - a.count);
  }
  return res.map(list => list.map(d => String.fromCharCode(A_CHAR_CODE + d)).join('')).join(' ');
}

function main() {
  let caseCount = parseInt(readLine(), 10);
  let counter = 1;
  while (caseCount) {
    readLine();
    const parties = readLine().split(' ').map(Number);
    const res = solve(parties);
    console.log(`Case #${counter}: ${res}`);
    caseCount -= 1;
    counter += 1;
  }
  process.exit();
}
