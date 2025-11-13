// 무조건 이어져있음이 보장됨
// 최단거리 문제
const fs = require("fs");
const [[N, M], ...board] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line, idx) => line.split(idx === 0 ? " " : "").map(Number)); // 미리 길을 -1로 초기화

const distance = board.map((line) => line.map((num) => (num ? -1 : 0)));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const bfs = () => {
    const q = [];
    q.push([0, 0]);
    distance[0][0] = 1; // 시작위치, 도착위치 포함

    while (q.length !== 0) {
        const [x, y] = q.shift();

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (distance[nx][ny] !== -1 || distance[nx][ny] === 0) continue; // 이미 방문했거나, 벽인 경우
            distance[nx][ny] = distance[x][y] + 1;
            q.push([nx, ny]);
        }
    }
};

bfs();

console.log(distance[N - 1][M - 1]);
