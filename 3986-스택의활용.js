const fs = require("fs");
const [N, ...lines] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");

let count = 0;

for (let line of lines) {
    const leftStack = [];
    let isGood = true;
    for (let char of line) {
        if (leftStack.length === 0 || leftStack[leftStack.length - 1] !== char)
            leftStack.push(char);
        else if (leftStack[leftStack.length - 1] === char) leftStack.pop();
        else {
            isGood = false;
            break;
        }
    }

    if (leftStack.length > 0) isGood = false;

    if (isGood) count++;
}

console.log(count);
