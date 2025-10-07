const fs = require("fs");
const [n, ...commands] = fs.readFileSync("a.txt").toString().trim().split("\n");
// 시간 초과 위험 문제.
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
    empty() {
        return this.size() ? 0 : 1;
    }
    front() {
        if (this.empty()) return -1;
        return this.arr[this.head];
    }
    back() {
        if (this.empty()) return -1;
        return this.arr.at(-1);
    }
}

const q = new Queue();
const answer = [];

for (let command of commands) {
    const args = command.split(" ");
    if (args[0] === "push") q.push(args[1]);
    else if (args[0] === "pop") answer.push(q.pop());
    else if (args[0] === "size") answer.push(q.size());
    else if (args[0] === "empty") answer.push(q.empty());
    else if (args[0] === "front") answer.push(q.front());
    else if (args[0] === "back") answer.push(q.back());
}

console.log(answer.join("\n"));
