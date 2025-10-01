const fs = require("fs");
const [_, ...lines] = fs.readFileSync("a.txt").toString().trim().split("\n");

for (let line of lines) {
    const left = [];
    const rightStack = [];
    for (let command of line) {
        if (command === "<") {
            if (left.length !== 0) {
                rightStack.push(left.pop());
            }
        } else if (command === ">") {
            if (rightStack.length !== 0) {
                left.push(rightStack.pop());
            }
        } else if (command === "-") {
            if (left.length !== 0) {
                left.pop();
            }
        } else {
            left.push(command);
        }
    }
    let answer = left.join("");
    for (let i = rightStack.length - 1; i >= 0; i--) {
        answer += rightStack[i];
    }
    console.log(answer);
}
