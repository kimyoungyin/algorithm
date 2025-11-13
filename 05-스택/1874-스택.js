const fs = require("fs");
const [N, ...nums] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map(Number);

const MX = 100000;
const stack = Array.from({ length: MX }, () => 0);
let pos = 0;

const arrToInsert = []; // 1~N
const answer = []; // + or -
let isPossible = true;

// 풀이 2
function push() {
    stack[pos++] = arrToInsert.pop();
    answer.push("+");
}

function pop() {
    pos--;
    answer.push("-");
}

function top() {
    if (!pos) return -1; // undefined 방지
    return stack[pos - 1];
}

for (let i = N; i >= 1; i--) {
    arrToInsert.push(i);
}

for (let num of nums) {
    while (num > top()) {
        push();
    }
    if (num === top()) {
        pop();
    } else {
        isPossible = false;
        break;
    }
}
console.log(isPossible ? answer.join("\n") : "NO");

// 풀이 1
// for (let num of nums) {
//     // 무조건 찾아야 함
//     // stack에 아예 숫자가 없다면 넣고 시작
//     if (!pos) push();
//     // top === num이면 pop하고 다음 순회
//     if (top() === num) pop();
//     // else if: top < num이면 push해서 top과 같을 때까지
//     else if (top() < num) {
//         while (true) {
//             push();
//             if (top() >= num) break;
//         }
//         if (top() > num) {
//             isPossible = false;
//             break;
//         }
//         pop();
//     } else {
//         // else: top > num이면 불가
//         isPossible = false;
//         break;
//     }
// }

// console.log(isPossible ? answer.join("\n") : "NO");
