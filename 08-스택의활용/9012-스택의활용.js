const fs = require("fs");
const [N, ...lines] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");

const answer = [];

for (let line of lines) {
    const stack = [];
    let isVPS = true;
    for (let char of line) {
        if (char === "(") stack.push(char);
        else {
            if (stack.at(-1) === "(") stack.pop();
            else {
                isVPS = false;
                break;
            }
        }
    }
    if (stack.length > 0) isVPS = false;

    answer.push(isVPS ? "YES" : "NO");
}

console.log(answer.join("\n"));
