const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const answer = [];

const pair = {
    ")": "(",
    "}": "{",
    "]": "[",
};

for (let line of lines) {
    if (line === ".") break; // 입력의 종료조건
    const leftStack = [];
    let isBalanced = true;
    for (let char of line) {
        if (char === "(" || char === "{" || char === "[") leftStack.push(char);
        else if (char === ")" || char === "}" || char === "]") {
            if (leftStack[leftStack.length - 1] !== pair[char]) {
                isBalanced = false;
                break;
            }
            leftStack.pop();
        }
    }
    if (leftStack.length > 0) {
        isBalanced = false;
    }
    answer.push(isBalanced ? "yes" : "no");
}

console.log(answer.join("\n"));
