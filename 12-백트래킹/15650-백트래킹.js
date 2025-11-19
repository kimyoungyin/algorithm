const fs = require("fs");
const [N, M] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const isUsed = Array(N + 1).fill(0);
const arr = [];

function solution(k) {
    if (k === M) {
        console.log(arr.join(" "));
        return;
    }
    // 맨 마지막 선택된 수 + 1부터 끝까지 중 탐색
    for (let i = (arr[arr.length - 1] || 0) + 1; i <= N; i++) {
        if (isUsed[i]) continue;
        isUsed[i] = 1;
        arr.push(i);
        solution(k + 1);
        isUsed[i] = 0;
        arr.pop(i);
    }
}

solution(0);
