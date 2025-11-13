const fs = require("fs");
const [str, _, ...lines] = fs
    .readFileSync("a.txt")
    .toString()
    .trim()
    .split("\n");

const left = [];
const right = [];

for (let char of str) {
    left.push(char);
}

for (let commandLine of lines) {
    const args = commandLine.split(" ");
    if (args[0] === "L") {
        if (left.length === 0) continue;
        const popped = left.pop();
        right.push(popped);
    } else if (args[0] === "D") {
        if (right.length === 0) continue;
        const popped = right.pop();
        left.push(popped);
    } else if (args[0] === "B") {
        left.pop();
    } else if (args[0] === "P") {
        left.push(args[1]);
    }
}

console.log([...left, ...right.reverse()].join(""));
