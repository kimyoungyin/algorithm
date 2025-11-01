const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [N, M, P] = input[0].split(" ").map(Number);

const ranges = input[1].split(" ").map(Number);

const board = input.slice(2).map((line) => line.split(""));

const count = Array(P).fill(0);

// 1~P 플레이어, 각 플레이어는 최소 1개 이상의 섬을 가짐

const q = [];
let head = 0;

for (let i = 1; i <= P; i++) {
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < M; y++) {
            if (board[x][y] == i) {
                q.push([x, y, 1]); // x좌표, y좌표, 현재 Range
                count[i - 1]++;
            }
        }
    }
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

while (head < q.length) {
    const [curX, curY, step] = q[head++];
    const player = Number(board[curX][curY]);
    if (ranges[player] <= step) continue; // 이미 스텝 이상이면 이후 상화좌우 체크 필요 없음
    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (board[nx][ny] !== ".") break;
        q.push([nx, ny, step + 1]);
        board[nx][ny] = player.toString();
        count[player - 1]++;
    }
}

console.log(count.join(" "));
