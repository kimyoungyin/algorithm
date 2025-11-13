const fs = require("fs");
const [[M, N, H], ...lines] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

const board = [];

// 초기화
for (let h = 0; h < H; h++) {
    // h층
    const layer = [];
    for (let n = 0; n < N; n++) {
        layer.push(lines[h * N + n]);
    }
    board.push(layer);
}

const q = [];
let head = 0; // shift 시간 초과 방지
for (let h = 0; h < H; h++) {
    for (let n = 0; n < N; n++) {
        for (let m = 0; m < M; m++) {
            if (board[h][n][m] === 0) {
                board[h][n][m] = -1;
                continue;
            }
            if (board[h][n][m] === 1) {
                q.push([h, n, m]);
            }
            board[h][n][m] = 0;
        }
    }
}

const dx = [1, 0, 0, -1, 0, 0];
const dy = [0, 1, 0, 0, -1, 0];
const dz = [0, 0, 1, 0, 0, -1];

let max = 0;
const bfs = () => {
    while (head < q.length) {
        const [z, x, y] = q[head++];

        for (let i = 0; i < 6; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            const nz = z + dz[i];
            if (nx < 0 || nx >= N || ny < 0 || ny >= M || nz < 0 || nz >= H)
                continue;
            if (board[nz][nx][ny] >= 0) continue;
            q.push([nz, nx, ny]);
            board[nz][nx][ny] = board[z][x][y] + 1;
            max = board[nz][nx][ny];
        }
    }
};

bfs();

if (
    board.some((layer) =>
        layer.some((line) => line.some((tomato) => tomato === -1))
    )
) {
    console.log(-1);
} else {
    console.log(max);
}
