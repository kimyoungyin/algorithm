const { reverse } = require("dns");
const fs = require("fs");
const [N, M] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const MX = 2 * 100_000 + 1;

const dis = Array(MX).fill(-1);
const prev = Array(MX).fill(-1);

const q = [];
let head = 0;
q.push(N);
dis[N] = 0;

findShortcut: while (head < q.length) {
    const curX = q[head++];

    for (let nx of [curX + 1, curX - 1, curX * 2]) {
        if (nx < 0 || nx >= MX) continue;
        if (dis[nx] !== -1) continue;
        if (nx === M) {
            prev[nx] = curX;
            dis[nx] = dis[curX] + 1;
            break findShortcut;
        }

        q.push(nx);
        dis[nx] = dis[curX] + 1;
        prev[nx] = curX;
    }
}

const path = [];
let cur = M;
while (cur !== -1) {
    path.push(cur);
    cur = prev[cur];
}
console.log(dis[M]);
console.log(path.reverse().join(" "));
