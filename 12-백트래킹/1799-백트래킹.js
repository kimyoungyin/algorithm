const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = +lines[0];

const board = lines.slice(1).map((line) => line.split(" ").map(Number));

// 최적화 포인트 1: 흑/백 나누기
const blackCands = [];
const whiteCands = [];

for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (board[x][y] === 1) {
            // 따로 넣기
            if ((x + y) % 2 === 0) blackCands.push([x, y]);
            else whiteCands.push([x, y]);
        }
    }
}

const used1 = Array(2 * N - 1).fill(false);
const used2 = Array(2 * N - 1).fill(false);

const backtrack = (cands, startIdx, k) => {
    let best = k;
    for (let i = startIdx; i < cands.length; i++) {
        const [x, y] = cands[i];
        const idx1 = x + y;
        const idx2 = N + x - y - 1;
        if (used1[idx1] || used2[idx2]) continue;
        used1[idx1] = true;
        used2[idx2] = true;
        const res = backtrack(cands, i + 1, k + 1);
        // 이후 반복문을 거치며 전 경우보다 더 큰 경우일 때
        if (res > best) best = res;
        used1[idx1] = false;
        used2[idx2] = false;
    }

    return best;
};

const blackMax = backtrack(blackCands, 0, 0);
const whiteMax = backtrack(whiteCands, 0, 0);

console.log(blackMax + whiteMax);
