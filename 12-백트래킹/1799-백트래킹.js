const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = +lines[0];

const board = lines.slice(1).map((line) => line.split(" ").map(Number));

const cand = [];
for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (board[x][y] === 1) cand.push([x, y]);
    }
}

const used1 = Array(2 * N - 1).fill(false);
const used2 = Array(2 * N - 1).fill(false);

let max = 0;

const pickedIdxs = [];

const solution = (k) => {
    // 모두 꽉차서 들어갈 수 없을 때
    if (k === cand.length) {
        max = Math.max(max, k);
        return;
    }
    let placed = 0;
    let start = 0;
    if (k > 0) start = pickedIdxs[k - 1] + 1;
    for (let i = start; i < cand.length; i++) {
        const [x, y] = cand[i];
        const idx1 = x + y;
        const idx2 = N + x - y - 1;
        if (used1[idx1] || used2[idx2]) continue;
        placed++;
        used1[idx1] = true;
        used2[idx2] = true;
        pickedIdxs[k] = i;
        solution(k + 1);
        used1[idx1] = false;
        used2[idx2] = false;
    }
    // 이후에 둔게 하나도 없으면 끝
    if (placed === 0) {
        max = Math.max(max, k);
    }
};

solution(0);

console.log(max);
