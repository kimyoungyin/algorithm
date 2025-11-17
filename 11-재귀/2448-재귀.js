const fs = require("fs");
const N = +fs.readFileSync("../dev/stdin").toString().trim();

const board = Array(N)
    .fill()
    .map(() => Array(2 * N - 1).fill(" "));

// base condition: N === 3이면 삼각형

// 삼각형을 만드는 k, 맨위 꼭짓점 좌표
function f(n, startX, startY) {
    if (n === 3) {
        board[startX][startY] = "*";

        board[startX + 1][startY - 1] = "*";
        board[startX + 1][startY + 1] = "*";

        board[startX + 2][startY - 2] = "*";
        board[startX + 2][startY - 1] = "*";
        board[startX + 2][startY] = "*";
        board[startX + 2][startY + 1] = "*";
        board[startX + 2][startY + 2] = "*";
        return;
    }
    for (let [x, y] of [
        [startX, startY],
        [startX + n / 2, startY - n / 2],
        [startX + n / 2, startY + n / 2],
    ]) {
        f(n / 2, x, y);
    }
}

f(N, 0, N - 1);

console.log(board.map((line) => line.join("")).join("\n"));
