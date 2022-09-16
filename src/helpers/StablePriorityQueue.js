import TinyQueue from "tinyqueue";

class MinStablePqueue {
  constructor(array) {
    this.pqueue = new TinyQueue(array, MinStablePqueue.orderFunc);
    this.counter = array.length;
  }

  static orderFunc(a, b) {
    let result = a.priority - b.priority;
    let they_are_equal = result === 0;

    if (they_are_equal) {
      return a.counter - b.counter;
    }

    return result;
  }

  static createPqueueItem(elem, priority, index) {
    return {
      value: elem,
      priority: priority,
      counter: index,
    };
  }

  pop() {
    return this.pqueue.pop();
  }

  peek() {
    return this.pqueue.peek();
  }

  peekPriority() {
    return this.pqueue.peek().priority;
  }

  push(item, priority) {
    this.pqueue.push(
      MinStablePqueue.createPqueueItem(item, priority, this.counter++)
    );
  }

  toArray() {
    let array = [];
    while (this.pqueue.length) array.push(this.pqueue.pop());
    this.pqueue = new TinyQueue(array, MinStablePqueue.orderFunc);
    return array;
  }
}

export default MinStablePqueue;
