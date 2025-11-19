const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = lines[0].split(" ").map(Number);

// 모두 다르고, 오름차순 정렬된 자연수
const sorted = lines[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

const arr = Array(M).fill(0);

const isUsed = Array(N).fill(0);

let ans = "";

function solution(k) {
    if (k === M) {
        ans += arr.join(" ") + "\n";
        return;
    }
    // 몇 번째 인덱스의 숫자를 고를까?
    for (let i = 0; i < N; i++) {
        if (isUsed[i]) continue;
        isUsed[i] = 1;
        arr[k] = sorted[i];
        solution(k + 1);
        isUsed[i] = 0;
    }
}

solution(0);

console.log(ans.trim());
