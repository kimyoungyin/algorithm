// 빌딩 문은 모두 잠겨있다.
// 열쇄는 일부 가지고 있기도, 바닥에 놓여있기도 하다
// 상화좌우 이동 가능(bfs)
// 문서를 훔쳐야 하며, '최대' 얼마나 훔칠 수 있는지 계산하자
// 소문자 열쇄로 대문자 문을 열자. 열쇄는 여러 개일 수 있고, 여러 번 사용 가능
// 시작점은 지유. 밖을 드나들 수 있다.
const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const T = +lines[0];
let idx = 1;

const isDoor = (char) =>
    char === char.toUpperCase() && char !== char.toLowerCase(); // 대문자이며, 알파벳인지

const isKey = (char) =>
    char === char.toLowerCase() && char !== char.toUpperCase();

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const isEdge = (X, Y, x, y) => {
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= X || ny < 0 || ny >= Y) return true;
    }
    return false;
};

for (let t = 0; t < T; t++) {
    const [X, Y] = lines[idx++].split(" ").map(Number);
    const board = lines.slice(idx, idx + X).map((line) => line.split(""));
    const keys = Array(26).fill(false);
    lines[idx + X].split("").forEach((kStr) => {
        if (kStr === "0") return; // 어차피 끝남
        keys[kStr.charCodeAt(0) - 97] = true;
    });
    const vis = Array(X)
        .fill()
        .map(() => Array(Y).fill(false));

    idx += X + 1;

    // BFS
    const q = [];
    const doors = Array(26)
        .fill()
        .map(() => []); // 아직 열쇄가 없어 통과하지 못한 문 위치
    let head = 0;
    let count = 0;
    // 시작점 찾기: 벽이 아니면 방문 처리
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            // 벽이 아니고, 모서리일 때
            if (board[x][y] !== "*" && isEdge(X, Y, x, y)) {
                // 문이라면, 열쇄가 없을 때는 doors에 푸시
                if (isDoor(board[x][y])) {
                    const kIdx = board[x][y].charCodeAt(0) - 65;
                    if (!keys[kIdx]) doors[kIdx].push([x, y]);
                    else {
                        q.push([x, y]);
                        vis[x][y] = true;
                    }
                    continue;
                }
                // 열쇄다?
                if (isKey(board[x][y])) {
                    const kIdx = board[x][y].charCodeAt(0) - 97;
                    keys[kIdx] = true;
                    while (doors[kIdx].length) {
                        const [doorX, doorY] = doors[kIdx].pop();
                        if (vis[doorX][doorY]) continue;
                        q.push([doorX, doorY]);
                        vis[doorX][doorY] = true;
                    }
                }
                // 중요 문서다?
                else if (board[x][y] === "$") {
                    count++;
                }
                // 벽 제외 나머지 모두
                q.push([x, y]);
                vis[x][y] = true;
            }
        }
    }

    // BFS
    while (head < q.length) {
        const [curX, curY] = q[head++];

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
            if (vis[nx][ny] || board[nx][ny] === "*") continue;
            // 빈 칸이다?
            if (board[nx][ny] === ".") {
                q.push([nx, ny]);
                vis[nx][ny] = true;
                continue;
            }
            // 벽이다?
            if (isDoor(board[nx][ny])) {
                const kIdx = board[nx][ny].charCodeAt(0) - 65;
                if (keys[kIdx]) {
                    q.push([nx, ny]);
                    vis[nx][ny] = true;
                } else {
                    doors[kIdx].push([nx, ny]);
                }
                continue;
            }
            // 열쇄다?
            if (isKey(board[nx][ny])) {
                const kIdx = board[nx][ny].charCodeAt(0) - 97;
                keys[kIdx] = true;
                while (doors[kIdx].length) {
                    const [doorX, doorY] = doors[kIdx].pop();
                    if (vis[doorX][doorY]) continue;
                    q.push([doorX, doorY]);
                    vis[doorX][doorY] = true;
                }
                q.push([nx, ny]);
                vis[nx][ny] = true;
                continue;
            }
            // 중요 문서다?
            if (board[nx][ny] === "$") {
                count++;
                q.push([nx, ny]);
                vis[nx][ny] = true;
            }
        }
    }
    console.log(count);
}
