const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [N, M, P] = input[0].split(" ").map(Number);

const ranges = [0, ...input[1].split(" ").map(Number)];

const board = input.slice(2).map((line) => line.split(""));

const counts = Array(P + 1).fill(0);

const qs = Array(P + 1)
    .fill()
    .map(() => []);
const heads = Array(P + 1).fill(0);

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
        const player = +board[x][y];
        if (Number.isNaN(player)) continue;
        counts[player]++;
        qs[player].push([x, y, 0]);
    }
}

// 게임 시작. 매턴마다
while (true) {
    let isExtend = 0; // 차례 때 아무도 확장하지 않았나?
    for (let p = 1; p <= P; p++) {
        const nextQ = [];

        while (heads[p] < qs[p].length) {
            const [curX, curY, curR] = qs[p][heads[p]++];

            // 이미 다 진행했으면,
            // 내 차례에서는 다음 진행을 위한 것만 큐에 추가하고 플레이어 차례를 종료
            // 큐에 들렀는지는 이미 nx, ny 쪽에서 처리했음
            if (curR >= ranges[p]) {
                nextQ.push([curX, curY, 0]);
                continue;
            }

            for (let i = 0; i < 4; i++) {
                const nx = curX + dx[i];
                const ny = curY + dy[i];
                const nr = curR + 1;

                if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
                if (board[nx][ny] !== ".") continue;
                // 빈공간, 아직 스텝이 진행중이면,
                qs[p].push([nx, ny, nr]);
                board[nx][ny] = p.toString();
                counts[p]++;
                isExtend = 1;
            }
        }

        qs[p] = nextQ;
        heads[p] = 0;
    }

    if (!isExtend) break;
}

console.log(counts.slice(1).join(" "));
