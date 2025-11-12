// 빌딩 문은 모두 잠겨있다.
// 열쇄는 일부 가지고 있기도, 바닥에 놓여있기도 하다
// 문서를 훔쳐야 하며, '최대' 얼마나 훔칠 수 있는지 계산하자
// 시작점은 지유. 밖을 드나들 수 있다: 상하좌우 한 칸씩 넓히기
// 방문 여부가 중요, 거리는 상관 없다.
// 못갔던 문을 다시 방문하는 방식을 떠올리는 것이 포인트: 새로운 배열 만들기
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

for (let t = 0; t < T; t++) {
    const [X, Y] = lines[idx++].split(" ").map(Number);
    const board = Array(X + 2)
        .fill()
        .map(() => Array(Y + 2).fill("."));
    const originBoard = lines.slice(idx, idx + X).map((line) => line.split(""));
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            board[x + 1][y + 1] = originBoard[x][y];
        }
    }
    const keys = Array(26).fill(false);
    lines[idx + X].split("").forEach((kStr) => {
        if (kStr === "0") return; // 어차피 끝남
        keys[kStr.charCodeAt(0) - 97] = true;
    });
    const vis = Array(X + 2)
        .fill()
        .map(() => Array(Y + 2).fill(false));

    idx += X + 1;

    // BFS
    const q = [];
    const doors = Array(26)
        .fill()
        .map(() => []); // 아직 열쇄가 없어 통과하지 못한 문 위치
    let head = 0;
    let count = 0;
    q.push([0, 0]);
    vis[0][0] = true;

    // BFS
    while (head < q.length) {
        const [curX, curY] = q[head++];

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            if (nx < 0 || nx >= X + 2 || ny < 0 || ny >= Y + 2) continue;
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
