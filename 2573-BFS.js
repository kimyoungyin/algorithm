// 보드를 다룬다고 모두 Flood Fill 알고리즘을 사용할 필요는 없다!
const fs = require("fs");
const [[X, Y], ...board] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

// 빙산 수
let mCount = 0;
// N년
let year = 0;

const bfs = (startX, startY, vis) => {
    const q = [];
    let head = 0;
    q.push([startX, startY]);
    vis[startX][startY] = true;

    while (head < q.length) {
        const [curX, curY] = q[head++];
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
            // board의 빈공간 발견
            if (board[nx][ny] === 0) continue;
            if (vis[nx][ny]) continue;
            // 빙산이면 큐에 담고 진행
            q.push([nx, ny]);
            vis[nx][ny] = true;
        }
    }
};

const melt = (vis) => {
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            if (!vis[x][y]) continue; // 빙하일 때
            let meltCount = 0;
            for (let i = 0; i < 4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                if (nx < 0 || nx >= X || ny < 0 || y >= Y) continue;
                if (vis[nx][ny]) continue; // 빙산이었으면 패스
                meltCount++;
            }
            board[x][y] -= meltCount;
            if (board[x][y] <= 0) {
                board[x][y] = 0; // 음수 보정
                mCount--;
            }
        }
    }
};

// 빙산 수 세기
for (let x = 0; x < X; x++) {
    for (let y = 0; y < Y; y++) {
        if (board[x][y]) mCount++;
    }
}

// 매년 세기:
while (mCount > 0) {
    // 빙산 묶음 수
    let count = 0;
    const vis = Array(X)
        .fill()
        .map(() => Array(Y).fill(false));
    // 빙산 묶음 확인
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            if (vis[x][y] || !board[x][y]) continue;
            count++;
            bfs(x, y, vis);
        }
    }
    if (count >= 2) break;
    // 빙산을 찾아다니며 녹이기
    melt(vis);
    year++;
}

console.log(mCount === 0 ? 0 : year);
