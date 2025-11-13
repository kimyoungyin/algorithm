const fs = require("fs");
const [N, K] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const dis = Array(100_000 * 2).fill(-1);

const q = [];
let head = 0;

q.push(N);
dis[N] = 0;

// 0초 걸리는 작업도 있기 때문에, 큐 순서가 거리 순을 보장하지 못한다.
while (head < q.length) {
    const cur = q[head++];

    for (let nx of [cur - 1, cur + 1, cur * 2]) {
        if (nx < 0 || nx >= 100_000 * 2) continue;
        const sec = dis[cur] + (nx === cur * 2 ? 0 : 1);
        if (dis[nx] === -1 || (dis[nx] !== -1 && dis[nx] > sec)) {
            q.push(nx);
            dis[nx] = sec;
        }
    }
}

console.log(dis[K]);
