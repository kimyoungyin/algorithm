const fs = require("fs");
const N = +fs.readFileSync("../dev/stdin").toString().trim();

// 2차원 문자열을 더하기 힘드니 보드로 구현해보자
const board = Array(N)
    .fill()
    .map(() => Array(N).fill(" "));

// base condition: N === 1일 때 *을 출력한다.
// 원래는 N === 3일 때로 출력하려다, N === 3일 때도 N > 3일 때와 동일한 패텀임을 파악했다.

// f(k)는 가운데 k/3*k/3정사각형이 있으며, 주변은 f(k-1)로 둘러쌓여있다.
// 3*3 순회를 하되, 중간을 생략하면 된다.
// 2차원 배열로 구현하기에, 시작 지점을 명시해주자

const f = (k, startX, startY) => {
    if (k === 1) return (board[startX][startY] = "*");
    const splitK = k / 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // 중앙이면 패스
            if (i === 1 && j === 1) continue;
            f(splitK, startX + i * splitK, startY + j * splitK);
        }
    }
};

f(N, 0, 0);

console.log(board.map((line) => line.join("")).join("\n"));
