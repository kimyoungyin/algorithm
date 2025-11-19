const fs = require("fs");
const [N, M] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const arr = Array(M).fill(0);

let ans = "";

function solution(k) {
    if (k === M) {
        ans += arr.join(" ") + "\n";
        return;
    }

    for (let i = 1; i <= N; i++) {
        arr[k] = i;
        solution(k + 1);
    }
}

solution(0);

console.log(ans.trim());
