const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = lines[0].split(" ").map(Number)[0];
// 불이 켜져있나?
const isOn = Array(N)
    .fill()
    .map(() => Array(N).fill(false));
// 이미 켰나?
const vis = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

// 불을 켤 수 있는 방 스위치 목록
const switchs = Array(N)
    .fill()
    .map(() =>
        Array(N)
            .fill()
            .map(() => [])
    );

// 각 방마다 스위치 초기화
lines.slice(1).forEach((line) => {
    const [x, y, a, b] = line.split(" ").map((str) => Number(str) - 1); // 인덱스로 변환
    switchs[x][y].push([a, b]);
});

const q = [];
let head = 0;

q.push([0, 0]);
vis[0][0] = true;
isOn[0][0] = true;

let count = 1;

// 불 켤 수 있는 방 켜기
if (switchs[0][0].length) {
    switchs[0][0].forEach(([a, b]) => {
        if (isOn[a][b]) return;
        isOn[a][b] = true;
        count++;
    });
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const isPossible = (x, y) => {
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (vis[nx][ny]) return true;
    }
    return false;
};

while (head < q.length) {
    const [curX, curY] = q[head++];

    // 현 위치에서 불 켜기
    switchs[curX][curY].forEach(([a, b]) => {
        if (isOn[a][b]) return;
        count++;
        isOn[a][b] = true;
        if (isPossible(a, b)) {
            q.push([a, b]);
            vis[a][b] = true;
        }
    });

    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (!isOn[nx][ny] || vis[nx][ny]) continue;

        q.push([nx, ny]);
        vis[nx][ny] = true;
    }
}

console.log(count);
