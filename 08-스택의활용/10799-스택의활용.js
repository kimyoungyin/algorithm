// 변수: 총 막대 수, 현재 겹친 막대 수(스택의 길이)
// 괄호 순서에 따른 에러 가능성은 없다.

const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim();

const stack = [];
let total = 0,
    isLazer = true;

for (let char of input) {
    if (char === "(") {
        stack.push(char);
        isLazer = true;
    } else {
        stack.pop();
        // 레이저인 경우: 이전에 "(" 였음
        if (isLazer) {
            total += stack.length;
            isLazer = false;
        } else {
            // 막대가 하나 끝났음. 조각 하나를 추가하고 종료
            total++;
        }
    }
}

console.log(total);
