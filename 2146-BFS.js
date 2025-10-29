// N * N, 모든 육지에 대한 BFS 풀이: 너무 오래 걸리지 않을까? .. 성공
const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = +lines[0];

const board = lines.slice(1).map((line) => line.split(" ").map(Number));

const vis = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

let IslandIdx = 1; // 1~M

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const groupIsland = (startX, startY) => {
    const q = [];
    let head = 0;
    q.push([startX, startY]);
    board[startX][startY] = IslandIdx;
    vis[startX][startY] = true;

    while (head < q.length) {
        const [curX, curY] = q[head++];

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (board[nx][ny] === 0 || vis[nx][ny]) continue;
            q.push([nx, ny]);
            board[nx][ny] = IslandIdx;
            vis[nx][ny] = true;
        }
    }
};

// 섬 구분 시작
for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (board[x][y] === 0 || vis[x][y]) continue;
        groupIsland(x, y);
        IslandIdx++;
    }
}

let ans = Infinity;

// 모든 육지에 대해 각각 bfs 진행: 오래 걸리진 않을까?
for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (!board[x][y]) continue;
        const dis = Array(N)
            .fill()
            .map(() => Array(N).fill(-1));

        const q = [];
        let head = 0;

        q.push([x, y]);
        dis[x][y] = 0;

        findShortcut: while (head < q.length) {
            const [curX, curY] = q[head++];

            for (let i = 0; i < 4; i++) {
                const nx = curX + dx[i];
                const ny = curY + dy[i];
                // 보드 범위를 벗어남
                if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                // 이미 방문했거나, 같은 섬임(x, y로 기존 섬 조회 가능)
                if (dis[nx][ny] >= 0 || board[nx][ny] === board[x][y]) continue;
                // 방문하지 않았고 다른 섬이거나 빈 칸임
                // 다른 섬 발견(x, y로 기존 섬 조회 가능)
                if (board[nx][ny] !== 0 && board[nx][ny] !== board[x][y]) {
                    ans = Math.min(ans, dis[curX][curY]);
                    break findShortcut;
                }
                // 방문하지 않은 빈 칸임
                q.push([nx, ny]);
                dis[nx][ny] = dis[curX][curY] + 1;
            }
        }
    }
}

console.log(ans);
