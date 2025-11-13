// 시작점의 종류가 여러 개일 때: 동시에 시작하지만 따로 한 번씩 BFS를 돌려야 하는 경우
const fs = require("fs");
const [cond, ...lines] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");

const [N, M] = cond.split(" ");
const board = lines.map((line) => line.split(""));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const qF = [];
let head = 0;
const fDist = board.map((line, x) =>
    line.map((el, y) => {
        if (el === "F") {
            qF.push([x, y]); // 시작점 초기화
            return 0;
        }
        return -1;
    })
);

while (head < qF.length) {
    const [x, y] = qF[head++];
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (fDist[nx][ny] >= 0 || board[nx][ny] === "#") continue;
        qF.push([nx, ny]);
        fDist[nx][ny] = fDist[x][y] + 1;
    }
}

const qP = [];
head = 0;
const pDist = board.map((line, x) =>
    line.map((el, y) => {
        if (el === "J") {
            qP.push([x, y]); // 시작점 초기화
            return 0;
        }
        return -1;
    })
);

let answer = 0;
let isPossible = false;

loop: while (head < qP.length) {
    const [x, y] = qP[head++];
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        // 보드 외부: 탈출 성공!
        //  큐는 거리가 순서대로 쌓이니 가장 먼저 등장한 것을 답으로 출력
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
            answer = pDist[x][y] + 1;
            isPossible = true;
            break loop;
        }
        // 이미 지나갔거나 벽
        if (pDist[nx][ny] >= 0 || board[nx][ny] === "#") continue;
        // 불은 이동했는데, 새로 이동할 곳까지의 시간 >= 불이 퍼질 때까지 걸린 시간 의 경우 못 감
        if (fDist[nx][ny] !== -1 && pDist[x][y] + 1 >= fDist[nx][ny]) continue;
        qP.push([nx, ny]);
        pDist[nx][ny] = pDist[x][y] + 1;
    }
}

console.log(isPossible ? answer : "IMPOSSIBLE");
