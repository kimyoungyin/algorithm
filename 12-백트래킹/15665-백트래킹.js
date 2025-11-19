// 같은 수를 여러 번 골라도 됨, 즉 중복 여부는 상관이 없음
const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = lines[0].split(" ").map(Number);
const uniqArr = [...new Set(lines[1].split(" ").map(Number))].sort(
    (a, b) => a - b
);

let ans = "";

const idxs = Array(M).fill(0);

const solution = (k) => {
    if (k === M) {
        ans += idxs.map((idx) => uniqArr[idx]).join(" ") + "\n";
        return;
    }

    for (let i = 0; i < uniqArr.length; i++) {
        idxs[k] = i;
        solution(k + 1);
    }
};

solution(0);

console.log(ans.trim());
