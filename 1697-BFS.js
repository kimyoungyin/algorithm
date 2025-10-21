// 1차원 BFS와 순간이동
const fs = require("fs");
const [N, M] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const MX = 100001;

const q = [];
let head = 0;

const board = Array(MX).fill(-1);

q.push(N);
board[N] = 0;
while (head < q.length) {
    const pos = q[head++];

    for (let npos of [pos + 1, pos - 1, pos * 2]) {
        // 범위 밖
        if (npos < 0 || npos >= MX) continue;
        // 간 적 있음
        if (board[npos] !== -1) continue;
        q.push(npos);
        board[npos] = board[pos] + 1;
    }
}

console.log(board[M]);
