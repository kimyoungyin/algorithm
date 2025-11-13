const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const dx = [2, 2, 1, 1, -1, -1, -2, -2];
const dy = [-1, 1, -2, 2, -2, 2, -1, 1];

const bfs = (N, start, end) => {
    const board = Array(N)
        .fill()
        .map(() => Array(N).fill(-1));
    const q = [];
    let head = 0;

    q.push(start);
    board[start[0]][start[1]] = 0;

    while (head < q.length) {
        const [curX, curY] = q[head++];

        for (let i = 0; i < 8; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            // 범위 밖
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            // 이미 방문함
            if (board[nx][ny] !== -1) continue;
            board[nx][ny] = board[curX][curY] + 1;
            q.push([nx, ny]);
        }
    }

    return board[end[0]][end[1]];
};

const T = +lines[0];

for (let i = 0; i < T; i++) {
    const N = +lines[i * 3 + 1];
    const start = lines[i * 3 + 2].split(" ").map(Number);
    const end = lines[i * 3 + 3].split(" ").map(Number);
    console.log(bfs(N, start, end));
}
