const fs = require("fs");
const N = +fs.readFileSync("../dev/stdin").toString().trim();

let ans = "";
let count = 0;
function hanoi(n, from = 1, to = 3) {
    // base condition: 원판이 하나면 from -> to
    if (n === 1) {
        count++;
        return (ans += `${from} ${to}\n`);
    }
    let toN = 6 - from - to;
    // 먼저 n-1~1을 나머지 기둥으로 옮긴다
    hanoi(n - 1, from, toN);
    // n 기둥을 to로 옮긴다
    count++;
    ans += `${from} ${to}\n`;
    // n-1~1기둥을 나머지 기둥에서 to로 옮긴다
    hanoi(n - 1, toN, to);
}

hanoi(N);

console.log(count);
console.log(ans);
