const fs = require("fs");
const [N, M] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const arr = Array(M).fill(0);

function solution(k) {
    if (k === M) {
        console.log(arr.join(" "));
        return;
    }
    // 맨 마지막 선택된 수 + 1부터 끝까지 중 탐색
    for (let i = (arr[k - 1] || 0) + 1; i <= N; i++) {
        arr[k] = i;
        solution(k + 1);
    }
}

solution(0);
