const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim();

let score = 0,
    isValid = true;

const stack = [];
const scoreStack = [];

for (let char of input) {
    if (char === "(" || char === "[") stack.push(char);
    if (char === ")" || char === "]") {
        if (stack.length === 0) {
            isValid = false;
            break;
        }
        if (char === ")") {
            if (stack.at(-1) !== "(") {
                isValid = false;
                break;
            }
        } else if (char === "]") {
            if (stack.at(-1) !== "[") {
                isValid = false;
                break;
            }
        }
    }
}

if (stack.length) {
    isValid = false;
}

console.log(isValid ? score : 0);
