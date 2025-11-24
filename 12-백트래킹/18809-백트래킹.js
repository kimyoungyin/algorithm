// 배양액은 총 두 가지, 배양액을 뿌릴 수 있는 장소는 정해져 있다.(2)
// 배양액은 매 초마다 퍼져나감(퍼지는 건 1, 2 다 가능)
// 꽃은은 두 배양액이 합치면 생기며, 배양액을 대신하기에 꽃에서부터는 퍼지지 않음
// 모든 배양액을 다 뿌리고 시작해야 함
// 피울 수 있는 꽃의 최대 개수 출력
const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M, G, R] = lines[0].split(" ").map(Number);

const board = lines.slice(1).map((line) => line.split(" ").map(Number));

const GREEN = 0;
const RED = 1;

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const bfs = (idxs) => {
    const dis = Array(N)
        .fill()
        .map(
            () =>
                Array(M)
                    .fill()
                    .map(() => Array(2).fill(-1)) // 그린, 레드
        );

    const q = [];
    let head = 0;

    let flowerCount = 0;

    for (const [idx, type] of idxs) {
        const x = Math.floor(idx / M);
        const y = idx % M;
        q.push([x, y, type]);
        dis[x][y][type] = 0;
    }

    while (head < q.length) {
        const [curX, curY, type] = q[head++];

        // 꽃이 되었으면 퍼트리지 않음
        if (
            dis[curX][curY][type] !== -1 &&
            dis[curX][curY][type] === dis[curX][curY][1 - type]
        )
            continue;
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (
                nx < 0 ||
                nx >= N ||
                ny < 0 ||
                ny >= M ||
                dis[nx][ny][type] !== -1 ||
                board[nx][ny] === 0
            )
                continue;
            dis[nx][ny][type] = dis[curX][curY][type] + 1;
            // 다른 색 배양액이 도착했다면
            if (dis[nx][ny][1 - type] !== -1) {
                // 동시에 도착한거면 꽃을 피운다
                if (dis[nx][ny][1 - type] === dis[nx][ny][type]) {
                    flowerCount++;
                } else {
                    // 늦었으면 이동하지 못한다
                }
            } else {
                // 아직 이 배양액이 처음이라면
                q.push([nx, ny, type]);
            }
        }
    }

    return flowerCount;
};

const plantedArr = Array(G + R);

const plant = (k) => {
    if (k === G + R) {
        chooseType(0);
        return;
    }
    let start = 0;
    if (k > 0) start = plantedArr[k - 1] + 1;

    for (let i = start; i < N * M; i++) {
        const x = Math.floor(i / M);
        const y = i % M;
        if (board[x][y] !== 2) continue;
        plantedArr[k] = i;
        plant(k + 1);
    }
};

const plantedCount = {
    [GREEN]: 0,
    [RED]: 0,
};

let max = 0;

const types = Array(G + R);

const chooseType = (k) => {
    if (k === G + R) {
        const idxsWithType = types.map((type, idx) => [plantedArr[idx], type]);
        max = Math.max(max, bfs(idxsWithType));
        return;
    }

    for (const type of [GREEN, RED]) {
        if (type === GREEN && plantedCount[type] >= G) continue;
        if (type === RED && plantedCount[type] >= R) continue;
        types[k] = type;
        plantedCount[type]++;
        chooseType(k + 1);
        plantedCount[type]--;
    }
};

plant(0);

console.log(max);
