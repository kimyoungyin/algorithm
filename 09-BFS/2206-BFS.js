const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [N, M] = lines[0].split(" ").map(Number);

const board = [];
for (let x = 1; x <= N; x++) {
    board.push(lines[x].split("").map(Number));
}

const bfs = () => {
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    const q = [];
    let head = 0;
    const dis = Array(N)
        .fill()
        .map(
            () =>
                Array(M)
                    .fill()
                    .map(() => [-1, -1]) // [안 부순 것, 부순 것]
        );
    q.push([0, 0, 0]); // 벽 부순 여부
    dis[0][0][0] = 1; // 시작 칸 포함

    while (head < q.length) {
        const [curX, curY, isDestroyed] = q[head++];

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            // 이미 방문한 경우
            if (dis[nx][ny][isDestroyed] !== -1) continue;
            // 처음인 경우
            // 1. 벽이 있을 때 아직 안 부숨
            if (board[nx][ny] && !isDestroyed) {
                dis[nx][ny][1] = dis[curX][curY][isDestroyed] + 1;
                q.push([nx, ny, 1]);
            } else if (!board[nx][ny]) {
                //	2. 벽이 없을 때
                dis[nx][ny][isDestroyed] = dis[curX][curY][isDestroyed] + 1;
                q.push([nx, ny, isDestroyed]);
            }
        }
    }
    return dis[N - 1][M - 1];
};

const result = bfs();

// 올바른 결과 처리
if (result[0] === -1 && result[1] === -1) {
    console.log(-1); // 도달 불가능
} else if (result[0] === -1) {
    console.log(result[1]); // 벽을 부숴야만 가능
} else if (result[1] === -1) {
    console.log(result[0]); // 벽을 부수지 않고 가능
} else {
    console.log(Math.min(result[0], result[1])); // 최단 경로
}
