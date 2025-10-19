const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim();

let score = 0,
    isValid = true;

const stack = [];
let smCount = 0,
    lgCount = 0,
    isValue = false;

for (let char of input) {
    if (char === "(" || char === "[") {
        if (char === "(") smCount++;
        else lgCount++;
        stack.push(char);
        isValue = true; // 값의 시작점
    }
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
            if (isValue) {
                // console.log(
                //     "소괄호 닫힘 발견, +",
                //     Math.pow(2, smCount) * Math.pow(3, lgCount)
                // );
                score += Math.pow(2, smCount) * Math.pow(3, lgCount);
            }
            stack.pop();
            smCount--;
        } else if (char === "]") {
            if (stack.at(-1) !== "[") {
                isValid = false;
                break;
            }
            if (isValue) {
                // console.log(
                //     "대괄호 닫힘 발견, +",
                //     Math.pow(2, smCount) * Math.pow(3, lgCount)
                // );

                score += Math.pow(2, smCount) * Math.pow(3, lgCount);
            }
            stack.pop();
            lgCount--;
        }
        isValue = false; // 이미 안에서 계산을 완료했기에 겉에 감싸진 스택 괄호는 계산에 추가하지 않음
    }
}

if (stack.length) {
    isValid = false;
}

console.log(isValid ? score : 0);
