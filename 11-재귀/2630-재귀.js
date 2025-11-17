const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = +lines[0];

const board = lines.slice(1).map((line) => line.split(" ").map(Number));

const counts = [0, 0];

const isAllSame = (startX, startY, length) => {
    let num = board[startX][startY];
    for (let x = startX; x < startX + length; x++) {
        for (let y = startY; y < startY + length; y++) {
            if (num !== board[x][y]) return false;
        }
    }
    return true;
};

const solution = (startX, startY, n) => {
    if (isAllSame(startX, startY, n)) {
        counts[board[startX][startY]] += 1;
        return;
    }
    const splitN = n / 2;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            solution(startX + i * splitN, startY + j * splitN, splitN);
        }
    }
};

solution(0, 0, N);

console.log(counts.join("\n"));
