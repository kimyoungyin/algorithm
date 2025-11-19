const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = lines[0].split(" ").map(Number);

// 모두 다르고, 오름차순 정렬된 자연수
const sorted = lines[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

const arrIdx = Array(M).fill(-1);

let ans = "";

function solution(k) {
    if (k === M) {
        ans += arrIdx.map((idx) => sorted[idx]).join(" ") + "\n";
        return;
    }
    // 몇 번째 인덱스의 숫자를 고를까? 0 ~ n -1
    let start = 0;
    if (k > 0) start = arrIdx[k - 1] + 1;
    for (let i = start; i < N; i++) {
        arrIdx[k] = i;
        solution(k + 1);
    }
}

solution(0);

console.log(ans.trim());
