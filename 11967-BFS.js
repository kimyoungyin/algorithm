const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = lines[0].split(" ").map(Number)[0];
// 불이 켜져있나?
const turnOn = Array(N)
    .fill()
    .map(() => Array(N).fill(false));
// 이미 켰나?
const vis = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

// 불을 켤 수 있는 방
const roomsCanTurnOn = Array(N)
    .fill()
    .map(() =>
        Array(N)
            .fill()
            .map(() => [])
    );

lines.slice(1).forEach((line) => {
    const [x, y, a, b] = line.split(" ").map((str) => Number(str) - 1); // 인덱스로 변환
    roomsCanTurnOn[x][y].push([a, b]);
});

const q = [];
let head = 0;

q.push([0, 0]);
vis[0][0] = true;
turnOn[0][0] = true;

let count = 1;

// 불 켤 수 있는 방 켜기
if (roomsCanTurnOn[0][0].length) {
    roomsCanTurnOn[0][0].forEach(([a, b]) => {
        if (turnOn[a][b]) return;
        turnOn[a][b] = true;
        count++;
    });
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

while (head < q.length) {
    const [curX, curY] = q[head++];

    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (!turnOn[nx][ny] || vis[nx][ny]) continue;

        q.push([nx, ny]);
        vis[nx][ny] = true;
        // 불 켤 수 있는 방 켜기
        if (roomsCanTurnOn[nx][ny].length) {
            roomsCanTurnOn[nx][ny].forEach(([a, b]) => {
                if (turnOn[a][b]) return; // 중복 방지(한 방을 두 방에서 다 켤 수 있음)
                turnOn[a][b] = true;
                count++;
                // 불 켠 후에 기존에 방문했던 곳에 인접하여 이동 가능한 곳이면 다시 방문할 것
                let isPossible = false;
                for (let j = 0; j < 4; j++) {
                    const nx = a + dx[j];
                    const ny = b + dy[j];
                    if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

                    if (vis[nx][ny]) {
                        isPossible = true;
                        break;
                    }
                }
                // 다시 방문 가능
                if (isPossible) {
                    q.push([a, b]);
                    vis[a][b] = true;
                    if (roomsCanTurnOn[a][b].length) {
                        roomsCanTurnOn[a][b].forEach(([na, nb]) => {
                            if (turnOn[na][nb]) return; // 중복 방지(한 방을 두 방에서 다 켤 수 있음)
                            turnOn[na][nb] = true;
                            count++;
                        });
                    }
                }
            });
        }
    }
}

console.log(count);
