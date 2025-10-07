const fs = require("fs");
const [n, ...commands] = fs.readFileSync("a.txt").toString().trim().split("\n");

class Queue {
    constructor() {
        this.arr = [];
    }
    push(data) {
        this.arr.push(data);
    }
    pop() {
        return this.arr.shift() || -1;
    }
    size() {
        return this.arr.length;
    }
    empty() {
        return this.size() ? 0 : 1;
    }
    front() {
        return this.arr[0] || -1;
    }
    back() {
        return this.arr.at(-1) || -1;
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
