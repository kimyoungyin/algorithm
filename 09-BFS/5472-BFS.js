const fs = require("fs");
const [T, ...lines] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let idx = 0;
const ans = [];
for (let i = 0; i < T; i++) {
    const [Y, X] = lines[idx++].split(" ").map(Number);
    const board = [];
    for (let j = 0; j < X; j++) {
        board.push(lines[idx++].split(""));
    }
    const disF = Array(X)
        .fill()
        .map(() => Array(Y).fill(-1));
    const dis = Array(X)
        .fill()
        .map(() => Array(Y).fill(-1));

    // 불 먼저 bfs
    const qF = [];
    const q = [];
    let head = 0;
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            if (board[x][y] === "*") {
                qF.push([x, y]);
                disF[x][y] = 0;
            } else if (board[x][y] === "@") {
                q.push([x, y]);
                dis[x][y] = 0;
            }
        }
    }

    while (head < qF.length) {
        const [curX, curY] = qF[head++];
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            // 불이 맵을 벗어남
            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
            // 벽에 막힘
            if (board[nx][ny] === "#") continue;
            // 이미 방문함
            if (disF[nx][ny] !== -1) continue;
            disF[nx][ny] = disF[curX][curY] + 1;
            qF.push([nx, ny]);
        }
    }
    // 이후 사람 bfs
    head = 0;
    let isPossible = false,
        time = 0;
    loop: while (head < q.length) {
        const [curX, curY] = q[head++];
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            // 탈출에 성공함
            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) {
                time = dis[curX][curY] + 1;
                isPossible = true;
                break loop;
            }
            // 벽에 막힘
            if (board[nx][ny] === "#") continue;
            // 이미 방문함
            if (dis[nx][ny] !== -1) continue;
            // 불이 있는데 내 시간보다 같거나 작을 경우 패스
            if (disF[nx][ny] !== -1 && disF[nx][ny] <= dis[curX][curY] + 1)
                continue;
            dis[nx][ny] = dis[curX][curY] + 1;
            q.push([nx, ny]);
        }
    }
    ans.push(isPossible ? time : "IMPOSSIBLE");
}

console.log(ans.join("\n"));
