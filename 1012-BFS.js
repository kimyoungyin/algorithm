const fs = require("fs");
const [T, ...lines] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");

let answer = [];

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let idx = 0;
for (let i = 0; i < T; i++) {
    const [M, N, K] = lines[idx++].split(" ").map(Number);

    const vegis = [];
    for (let j = 0; j < K; j++) {
        vegis.push(lines[idx++].split(" ").map(Number));
    }

    const board = Array(N)
        .fill()
        .map(() => Array(M).fill(0));
    const vis = Array(N)
        .fill()
        .map(() => Array(M).fill(false));
    for (const [m, n] of vegis) {
        board[n][m] = 1;
    }

    const bfs = (x, y) => {
        const q = [];
        let head = 0;
        q.push([x, y]);
        vis[x][y] = true;
        while (head < q.length) {
            const [curX, curY] = q[head++];

            for (let i = 0; i < 4; i++) {
                const nx = curX + dx[i];
                const ny = curY + dy[i];

                if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
                if (board[nx][ny] === 0) continue;
                if (vis[nx][ny] === true) continue;
                q.push([nx, ny]);
                vis[nx][ny] = true;
            }
        }
    };

    let count = 0;
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < M; y++) {
            if (!vis[x][y] && board[x][y] === 1) {
                count++;
                bfs(x, y);
            }
        }
    }
    answer.push(count);
}

console.log(answer.join("\n"));
