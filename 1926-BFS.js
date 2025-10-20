const fs = require("fs");
const [[N, M], ...board] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

const vis = Array(N)
    .fill()
    .map(() => Array(M).fill(false));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let count = 0;
let max = 0;

const bfs = (start = [0, 0]) => {
    const q = [];
    let size = 1;
    q.push(start);
    vis[start[0]][start[1]] = true;

    while (q.length !== 0) {
        const [x, y] = q.shift();

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (vis[nx][ny] || board[nx][ny] !== 1) continue;
            vis[nx][ny] = true;
            q.push([nx, ny]);
            size++;
        }
    }
    max = Math.max(max, size);
    count++;
};
// 핵심: 이중 for문을 돌며 각 bfs가 끝났을 때마다 방문하지 않았으면서 board에 그림이 그려진 부분 중 방문하지 않은 시작접을 찾는다.
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (vis[i][j] || !board[i][j]) continue;
        bfs([i, j]);
    }
}

console.log(`${count}\n${max}`);
