const fs = require("fs");
const [N, K] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const getKPos = (s) => K + (s * (s + 1)) / 2;
const MX = 500_000;
const dis = Array(MX + 1).fill(-1);

const q = [];
let head = 0;

q.push(N);
dis[N] = 0;

let ans = -1;

while (head < q.length) {
    const curX = q[head++];

    if (getKPos(dis[curX]) === curX) {
        if (getKPos(dis[curX]) <= MX) ans = dis[curX];
        break;
    }

    for (let nx of [curX + 1, curX - 1, curX * 2]) {
        if (nx < 0 || nx > MX) continue;
        if (dis[nx] !== -1) continue;

        q.push(nx);
        dis[nx] = dis[curX] + 1;
    }
}

console.log(ans);
