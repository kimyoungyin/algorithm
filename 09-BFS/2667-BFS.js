const fs = require("fs");
// const [[N], ...board] = fs
//     .readFileSync("dev/stdin")
//     .toString()
//     .trim()
//     .split("\n")
//     .map((line) => line.split("").map(Number));
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // 주의! 구조분해할당으로 나누면 N이 두 자리 수인 경우 에러 발생
const board = input.slice(1).map((line) => line.split("").map(Number));

const vis = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const ans = [];

const bfs = (x, y) => {
    const q = [];
    let head = 0;

    q.push([x, y]);
    vis[x][y] = true;
    let count = 0;
    while (head < q.length) {
        const [curX, curY] = q[head++];
        count++;
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (board[nx][ny] === 0) continue;
            if (vis[nx][ny]) continue;
            // 범위 안 벗어남, 아파트 있음, 방문하지 않았음
            vis[nx][ny] = true;
            q.push([nx, ny]);
        }
    }
    return count;
};

for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (!vis[x][y] && board[x][y] === 1) ans.push(bfs(x, y));
    }
}

console.log([ans.length, ...ans.sort((a, b) => a - b)].join("\n"));
