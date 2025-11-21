// 이다솜파는 칠공주를 결성하자(s)
// 적어도 4명 이상의 S
// 7명은 서로 인접

const fs = require("fs");

const board = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const selected = Array(5)
    .fill()
    .map(() => Array(5).fill(false));

const idxs = Array(7);

let count = 0;

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const select7AndCheckPossiblity = (k, order = 0) => {
    if (k === 7) {
        // bfs 후 연결되어있지 않거나, S가 4 미만이면 카운트 증가 안함
        let sCount = 0;
        for (let [x, y] of idxs) {
            if (board[x][y] === "S") sCount++;
        }
        if (sCount < 4) return;
        const vis = Array(5)
            .fill()
            .map(() => Array(5).fill(false));

        const q = [];
        let head = 0;
        const [startX, startY] = idxs[0];
        q.push([startX, startY]);
        vis[startX][startY] = true;
        let connected = 1;
        while (head < q.length) {
            const [curX, curY] = q[head++];

            for (let i = 0; i < 4; i++) {
                const nx = curX + dx[i];
                const ny = curY + dy[i];

                if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5 || !selected[nx][ny])
                    continue;
                if (vis[nx][ny]) continue;
                vis[nx][ny] = true;
                connected++;
                q.push([nx, ny]);
            }
        }

        if (connected === 7) count++;

        return;
    }

    for (let i = order; i < 25; i++) {
        const x = Math.floor(i / 5);
        const y = i % 5;
        if (selected[x][y]) continue;
        idxs[k] = [x, y];
        selected[x][y] = true;
        select7AndCheckPossiblity(k + 1, i + 1);
        selected[x][y] = false;
    }
};

select7AndCheckPossiblity(0);

console.log(count);
