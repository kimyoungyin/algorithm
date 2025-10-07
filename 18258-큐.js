const fs = require("fs");
const [n, ...commands] = fs.readFileSync("a.txt").toString().trim().split("\n");
// 시간 초과 위험 문제.

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    push(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }
        this.size++;
    }
    pop() {
        if (!this.size) return -1;
        const popped = this.head.data;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.size--;
        return popped;
    }
    empty() {
        return this.size ? 0 : 1;
    }
    front() {
        if (this.empty()) return -1;
        return this.head.data;
    }
    back() {
        if (this.empty()) return -1;
        return this.tail.data;
    }
}

const q = new Queue();
const answer = [];

for (let command of commands) {
    const args = command.split(" ");
    if (args[0] === "push") q.push(args[1]);
    else if (args[0] === "pop") answer.push(q.pop());
    else if (args[0] === "size") answer.push(q.size);
    else if (args[0] === "empty") answer.push(q.empty());
    else if (args[0] === "front") answer.push(q.front());
    else if (args[0] === "back") answer.push(q.back());
}

console.log(answer.join("\n"));
