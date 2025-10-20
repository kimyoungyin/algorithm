// BFS의 응용: 시작점이 여러 곳, 동시 시작
// 이동 못함: 0, 이미 넣은 것 0, 익지 않은 것 -1
const fs = require("fs");
const [[M, N], ...board] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

// 핵심: 모든 시작점을 큐에 넣고 시작한다
const q = [];
let head = 0; // 주의: 시간초과 가능성이 있을 경우 이 방법 사용
const days = board.map((line, x) =>
    line.map((tomato, y) => {
        if (tomato === 0) {
            return -1; // 익지 않은 건 -1로 초기화
        }
        if (tomato === 1) {
            q.push([x, y]); // 익은 건 넣고 시작
        }
        return 0; // 시작점과 벽은 0으로 초기화
    })
);

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

// 시작점

let ans = 0;

const bfs = () => {
    while (head < q.length) {
        // 주의: 시간 초과 가능성이 있을 경우
        const [x, y] = q[head++];
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            // 범위 밖
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            // 이미 세었거나, 벽으로 막힌 경우
            if (days[nx][ny] >= 0) continue;
            // 범위 안이며, 세지도 않았고, 벽도 아닐 때
            q.push([nx, ny]);
            days[nx][ny] = days[x][y] + 1;
            ans = Math.max(ans, days[nx][ny]);
        }
    }
};

bfs();

if (days.some((line) => line.some((tomato) => tomato === -1))) {
    console.log(-1);
} else {
    console.log(ans);
}
