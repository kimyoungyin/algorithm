const fs = require("fs");
const [_, ...lines] = fs.readFileSync("a.txt").toString().trim().split("\n");

const MX = 1000005;
const dat = Array.from({ length: MX * 2 + 1 }, () => 0);
let head = MX;
let tail = MX;

const push_front = (data) => {
    dat[--head] = data;
};

const push_back = (data) => {
    dat[tail++] = data;
};

const pop_front = () => {
    if (isEmpty()) return -1;
    return dat[head++] || -1;
};

const pop_back = () => {
    if (isEmpty()) return -1;
    return dat[--tail] || -1;
};

const size = () => {
    return tail - head;
};

const isEmpty = () => size() === 0;

const front = () => {
    if (isEmpty()) return -1;
    return dat[head] || -1;
};

const back = () => {
    if (isEmpty()) return -1;
    return dat[tail - 1] || -1;
};

const answer = [];

for (let line of lines) {
    const command = line.split(" ");
    if (command[0] === "push_front") push_front(command[1]);
    else if (command[0] === "push_back") push_back(command[1]);
    else if (command[0] === "pop_front") answer.push(pop_front());
    else if (command[0] === "pop_back") answer.push(pop_back());
    else if (command[0] === "size") answer.push(size());
    else if (command[0] === "empty") answer.push(isEmpty() ? 1 : 0);
    else if (command[0] === "front") answer.push(front());
    else if (command[0] === "back") answer.push(back());
}

console.log(answer.join("\n"));
