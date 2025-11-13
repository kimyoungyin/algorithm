// 세 번째 시도: 다시 돌아올 수 있음은 홀수/짝수 지점의 경우는 홀수/짝수 초에 다시 방문이 가능하므로, 이차원 배열이되 (MX + 1) * 2의 간단한 배열로 관리(2는 홀짝)
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
    .map(() => Array(2).fill(false)); // [위치,짝홀초]

const q = [];
let head = 0;

q.push([N, 0]);
vis[N][0] = true;

let ans = -1;

while (head < q.length) {
    const [curX, sec] = q[head++];
    // sec초가 지난 후 동생의 위치를 계산
    const curK = getKPos(sec);
    // curK가 범위 이내이고, 이전에 수빈이가 온 적이 있었던 곳에 동생이 도달한 시간이라면, 동생이 도달한 시간에 수빈은 다시 도달 가능하다.
    if (curK <= MX && vis[curK][sec % 2]) {
        ans = sec;
        break;
    }
    // 지난 시간에 따라 구한 동생의 위치가 아직 방문한 적 없는 곳이라면 다시 BFS를 시작한다
    for (let nx of [curX + 1, curX - 1, curX * 2]) {
        if (nx < 0 || nx > MX) continue;
        if (vis[nx][(sec + 1) % 2]) continue;

        vis[nx][(sec + 1) % 2] = true;
        q.push([nx, sec + 1]);
    }
}

console.log(ans);
