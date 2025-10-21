const fs = require("fs");
const [_, ...board] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(""));
const N = board.length;

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
const count = {
    blue: 0,
    rest: 0,
};

const countWeak = {
    blue: 0,
    rest: 0,
};

const vis = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

const visWeak = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

const bfs = (startX, startY, count, vis, isWeak) => {
    let q = [];
    head = 0;

    // 넣고 시작
    q.push([startX, startY]);
    vis[startX][startY] = true;
    const type = board[startX][startY];
    if (type === "B") count.blue++;
    else count.rest++;

    while (head < q.length) {
        const [curX, curY] = q[head++];
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            // 범위 밖
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            // 범위 안이지만 방문함
            if (vis[nx][ny]) continue;
            // 색이 아예 같을 때
            if (board[nx][ny] === type) {
                vis[nx][ny] = true;
                q.push([nx, ny]);
            }
            // 색은 다른데 색약이라 다른 게 같게 보일 때
            else if (
                isWeak &&
                ((board[nx][ny] === "R" && type === "G") ||
                    (board[nx][ny] === "G" && type === "R"))
            ) {
                vis[nx][ny] = true;
                q.push([nx, ny]);
            }
        }
    }
};

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (!vis[i][j]) bfs(i, j, count, vis);
        if (!visWeak[i][j]) bfs(i, j, countWeak, visWeak, true);
    }
}

console.log(count.blue + count.rest, countWeak.blue + countWeak.rest);
