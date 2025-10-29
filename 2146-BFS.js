// N * N * IslandIdx 3차원 배열 풀이: 메모리 초과
const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = +lines[0];

const board = lines.slice(1).map((line) => line.split(" ").map(Number));

/**
 * 0~섬 수
 */
const islands = Array(N)
    .fill()
    .map(() => Array(N).fill(-1));

let IslandIdx = 0;

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const groupIsland = (startX, startY) => {
    const q = [];
    let head = 0;
    q.push([startX, startY]);
    islands[startX][startY] = IslandIdx;

    while (head < q.length) {
        const [curX, curY] = q[head++];

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (board[nx][ny] === 0 || islands[nx][ny] === IslandIdx) continue;
            q.push([nx, ny]);
            islands[nx][ny] = IslandIdx;
        }
    }
};

// 섬 구분 시작
for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (islands[x][y] !== -1 || board[x][y] === 0) continue;
        groupIsland(x, y);
        IslandIdx++;
    }
}

const q = [];
let head = 0;

const dis = Array(N)
    .fill()
    .map(() =>
        Array(N)
            .fill()
            .map(() => Array(IslandIdx).fill(0))
    );

// 섬 모서리 찾아 큐에 담기
for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        if (board[x][y]) continue;

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (!board[nx][ny]) continue;
            // x, y가 섬 인접한 빈 칸일 때
            if (dis[x][y][islands[nx][ny]] === 1) continue; // 이미 등록함
            q.push([x, y, islands[nx][ny]]);
            dis[x][y][islands[nx][ny]] = 1;
        }
    }
}

findShortCut: while (head < q.length) {
    const [curX, curY, startIsland] = q[head++];

    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        // 다른 섬을 발견했다면: 현재 거리를 저장하고 break;
        if (islands[nx][ny] !== -1 && islands[nx][ny] !== startIsland) {
            console.log(dis[curX][curY][startIsland]);
            break findShortCut;
        }
        // 방문하지 못한 빈 공간을 발견했다면: dis + 1 하고 전달
        if (islands[nx][ny] === -1 && dis[nx][ny][startIsland] === 0) {
            q.push([nx, ny, startIsland]);
            dis[nx][ny][startIsland] = dis[curX][curY][startIsland] + 1;
        }
    }
}
