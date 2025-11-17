const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = +lines[0];

const board = lines.slice(1).map((line) => line.split("").map(Number));

// base condition: 정사각형이 모두 같은 색일 때
// 주의: k === 1일 때는 괄호 표시를 하지 않는다.

const isSame = (sX, sY, length) => {
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (board[sX + i][sY + j] !== board[sX][sY]) return false;
        }
    }
    return true;
};

const solution = (sX, sY, n) => {
    if (isSame(sX, sY, n)) {
        return board[sX][sY];
    }

    let ans = "(";
    const splitN = n / 2;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            ans += solution(sX + i * splitN, sY + j * splitN, splitN);
        }
    }
    return ans + ")";
};

console.log(solution(0, 0, N));
