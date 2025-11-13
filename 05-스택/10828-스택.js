const fs = require("fs");
const [_, ...commands] = fs.readFileSync("a.txt").toString().trim().split("\n");
const stack = [];
let answer = "";
for (let line of commands) {
    const command = line.split(" ");
    if (command[0] === "push") {
        stack.push(Number(command[1]));
    } else if (command[0] === "pop") {
        const popped = stack.pop();
        answer += popped === undefined ? -1 : popped;
    } else if (command[0] === "size") {
        answer += stack.length;
    } else if (command[0] === "empty") {
        answer += stack.length === 0 ? 1 : 0;
    } else if (command[0] === "top") {
        const top = stack.at(-1);
        answer += top === undefined ? -1 : top;
    }
    answer += "\n";
}

console.log(answer);
