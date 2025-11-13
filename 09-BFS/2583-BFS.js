const fs = require("fs");
const [[M, N, K], ...rects] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

const board = Array(M)
    .fill()
    .map(() => Array(N).fill(-1));

for (const rect of rects) {
    const [startY, startX, endY, endX] = rect; // 역전이 포인트
    for (let i = startX; i < endX; i++) {
        for (let j = startY; j < endY; j++) {
            board[i][j] = 0;
        }
    }
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const bfs = (x, y) => {
    const q = [];
    let head = 0;

    board[x][y] = 0;
    q.push([x, y]);
    let size = 0;
    while (head < q.length) {
        const [curX, curY] = q[head++];
        size++; // 너비는 최단 경로와 다르다
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            // 범위 밖
            if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
            // 사각형이 차지하거나(벽) 이미 방문함
            if (board[nx][ny] >= 0) continue;
            q.push([nx, ny]);
            board[nx][ny] = board[curX][curY] + 1;
        }
    }
    return size;
};

let count = 0;
const sizes = [];
for (let x = 0; x < M; x++) {
    for (let y = 0; y < N; y++) {
        if (board[x][y] === -1) {
            count++;
            sizes.push(bfs(x, y));
        }
    }
}

console.log(`${count}\n${sizes.sort((a, b) => a - b).join(" ")}`);
