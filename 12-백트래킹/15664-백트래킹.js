const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = lines[0].split(" ").map(Number);
const arr = lines[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

const idxs = Array(M).fill(-1);

let ans = "";
const solution = (k) => {
    if (k === M) {
        ans += idxs.map((idx) => arr[idx]).join(" ") + "\n";
        return;
    }
    let temp = 0;
    let start = k > 0 ? idxs[k - 1] + 1 : 0;
    for (let i = start; i < N; i++) {
        const num = arr[i];
        if (temp === num) continue;
        idxs[k] = i;
        temp = num;
        solution(k + 1);
    }
};

solution(0);

console.log(ans.trim());
