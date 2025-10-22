// 최솟값~최댓값-1까지 bfs를 돌려보면 된다
const fs = require("fs");
const [[N], ...board] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

let max = 1,
    min = 1;

for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        max = Math.max(max, board[x][y]);
        min = Math.min(min, board[x][y]);
    }
}

let maxCount = 0;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
for (let rain = min; rain < max; rain++) {
    const vis = Array(N)
        .fill()
        .map(() => Array(N).fill(false));
    let count = 0;
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            if (!vis[x][y] && board[x][y] > rain) {
                // 횟수 증가
                count++;
                // bfs
                const q = [];
                let head = 0;
                q.push([x, y]);
                vis[x][y] = true;

                while (head < q.length) {
                    const [curX, curY] = q[head++];

                    for (let i = 0; i < 4; i++) {
                        const nx = curX + dx[i];
                        const ny = curY + dy[i];

                        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                        if (board[nx][ny] <= rain) continue;
                        if (vis[nx][ny]) continue;
                        q.push([nx, ny]);
                        vis[nx][ny] = true;
                    }
                }
            }
        }
    }
    // 현재 높이일 때 영역 수 vs 기존 최대 영역수
    maxCount = Math.max(count, maxCount);
}

console.log(maxCount);
