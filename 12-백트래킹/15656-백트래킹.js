const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = lines[0].split(" ").map(Number);
const nums = lines[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

const idxs = Array(M).fill(-1);

let ans = "";
const solution = (k) => {
    if (k === M) {
        ans += idxs.map((idx) => nums[idx]).join(" ") + "\n";
        return;
    }
    for (let i = 0; i < N; i++) {
        idxs[k] = i;
        solution(k + 1);
    }
};

solution(0);

console.log(ans.trim());
