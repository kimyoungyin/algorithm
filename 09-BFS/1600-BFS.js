const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const LIKE_HORSE_COUNT = +input[0];

const [Y, X] = input[1].split(" ").map(Number);

const board = input.slice(2).map((line) => line.split(" ").map(Number));

const dxh = [1, 2, 2, 1, -1, -2, -2, -1];
const dyh = [2, 1, -1, -2, -2, -1, 1, 2];

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const q = [];
let head = 0;

// 일단 3차원 배열
const dis = Array(X)
    .fill()
    .map(() =>
        Array(Y)
            .fill()
            .map(() => Array(LIKE_HORSE_COUNT + 1).fill(-1))
    );

q.push([0, 0, 0]);
dis[0][0][0] = 0;

while (head < q.length) {
    const [curX, curY, horseCount] = q[head++];
    if (horseCount < LIKE_HORSE_COUNT) {
        for (let i = 0; i < 8; i++) {
            const nx = curX + dxh[i];
            const ny = curY + dyh[i];

            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
            if (board[nx][ny] === 0 && dis[nx][ny][horseCount + 1] === -1) {
                q.push([nx, ny, horseCount + 1]);
                dis[nx][ny][horseCount + 1] = dis[curX][curY][horseCount] + 1;
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
        if (board[nx][ny] === 0 && dis[nx][ny][horseCount] === -1) {
            q.push([nx, ny, horseCount]);
            dis[nx][ny][horseCount] = dis[curX][curY][horseCount] + 1;
        }
    }
}

// 방법 1: null 병합 연산자 사용
const ans = dis[X - 1][Y - 1].filter((n) => n !== -1).sort((a, b) => a - b)[0];
console.log(ans ?? -1);
