const fs = require("fs");
const N = +fs.readFileSync("a.txt").toString().trim();

class Queue {
    constructor() {
        this.arr = [];
        this.head = 0;
    }
    push(data) {
        this.arr.push(data);
    }
    pop() {
        const popped = this.arr[this.head] || -1;
        if (popped !== -1) this.head++; // 관념적으로 head의 인덱스를 변경한다.
        return popped;
    }
    size() {
        return this.arr.length - this.head;
    }
    front() {
        if (this.size()) return this.arr[this.head];
        return -1;
    }
}

const q = new Queue();
for (let i = 1; i <= N; i++) {
    q.push(i);
}

while (true) {
    if (q.size() === 1) break;
    q.pop();
    if (q.size() === 1) break;
    q.push(q.pop());
}

console.log(q.front());
