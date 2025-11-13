const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const dx = [1, 0, 0, -1, 0, 0];
const dy = [0, 1, 0, 0, -1, 0];
const dz = [0, 0, 1, 0, 0, -1];

const T = [];

// 케이스별 분리
let idx = 0;
while (true) {
    const [Z, X, Y] = lines[idx++].split(" ").map(Number);
    if (Z === 0) break;
    const testCase = [[Z, X, Y]];
    const board = [];
    for (let z = 0; z < Z; z++) {
        const floor = [];
        for (let x = 0; x < X; x++) {
            const boardLine = lines[idx++].split("");
            floor.push(boardLine);
        }
        idx++;
        board.push(floor);
    }
    testCase.push(board);
    T.push(testCase);
}

const ans = [];
// 테스트 케이스별 시행
for (let i = 0; i < T.length; i++) {
    const [Z, X, Y] = T[i][0];
    const board = T[i][1];
    const dis = Array(Z)
        .fill()
        .map(() =>
            Array(X)
                .fill()
                .map(() => Array(Y).fill(-1))
        );

    const q = [];
    let head = 0;

    // S 찾아 초기화
    findS: for (let z = 0; z < Z; z++) {
        for (let x = 0; x < X; x++) {
            for (y = 0; y < Y; y++) {
                if (board[z][x][y] === "S") {
                    q.push([z, x, y]);
                    dis[z][x][y] = 0;
                    break findS;
                }
            }
        }
    }

    let minutes = -1;
    toE: while (head < q.length) {
        const [curZ, curX, curY] = q[head++];

        for (let j = 0; j < 6; j++) {
            const nx = curX + dx[j];
            const ny = curY + dy[j];
            const nz = curZ + dz[j];

            if (nx < 0 || nx >= X || ny < 0 || ny >= Y || nz < 0 || nz >= Z)
                continue;
            if (board[nz][nx][ny] === "#" || dis[nz][nx][ny] !== -1) continue;
            dis[nz][nx][ny] = dis[curZ][curX][curY] + 1;
            if (board[nz][nx][ny] === "E") {
                minutes = dis[nz][nx][ny];
                break toE;
            } else {
                q.push([nz, nx, ny]);
            }
        }
    }
    ans.push(minutes === -1 ? "Trapped!" : `Escaped in ${minutes} minute(s).`);
}

console.log(ans.join("\n"));
