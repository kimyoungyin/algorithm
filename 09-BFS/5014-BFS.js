const fs = require("fs");
const [F, S, G, U, D] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const board = Array(F).fill(-1);
const dx = [U, -D];
const q = [];
let head = 0;
// 층수이므로, 층-1로 인덱스화하여 초기화
q.push(S - 1);
board[S - 1] = 0;

while (head < q.length) {
    const curX = q[head++];

    for (let i = 0; i < 2; i++) {
        const nx = curX + dx[i];
        if (nx < 0 || nx >= F) continue;
        if (board[nx] !== -1) continue;
        board[nx] = board[curX] + 1;
        q.push(nx);
    }
}

console.log(board[G - 1] === -1 ? "use the stairs" : board[G - 1]);
