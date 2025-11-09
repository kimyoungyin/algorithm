// 두 번째 시도(메모리 초과): 시작을 차원으로 관리하여, 해당 초에 좌표에 방문한 적 있는지를 큐에 담아 이차원 배열로 체크
const fs = require("fs");
const [N, K] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const getKPos = (s) => K + (s * (s + 1)) / 2;
const MX = 500_000;
const vis = Array(MX + 1)
    .fill()
    .map(() => Array(MX + 1).fill(false));

const q = [];
let head = 0;

q.push([N, 0]);
vis[N][0] = true;

let ans = -1;

while (head < q.length) {
    const [curX, sec] = q[head++];
    const curK = getKPos(sec);
    if (curK === curX) {
        if (curK <= MX) ans = sec;
        break;
    }

    for (let nx of [curX + 1, curX - 1, curX * 2]) {
        if (nx < 0 || nx > MX || curK < 0 || curK >= MX) continue;
        if (vis[nx][sec + 1]) continue;

        q.push([nx, sec + 1]);
        vis[nx][sec + 1] = true;
    }
}

console.log(ans);
