// 내 풀이: 성공
//  실수1: 케이스 별로 나눠야할 반복문 범위를 잘못 작성함
// 실수2: 시작점으로 선정하지 않을 조건을 VISITED가 아닌 것으로 설정함
const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const TYPE = {
    NOT_VISITED: 0,
    VISITED: 1,
    NOT_CYCLE: 2,
    CYCLE: 3,
};
// 케이스 별로
for (let t = 0; t < lines[0]; t++) {
    const boardCount = +lines[2 * t + 1];
    const board = lines[2 * t + 2]
        .split(" ")
        .map(Number)
        .map((order) => order - 1);
    const states = Array(boardCount)
        .fill()
        .map(() => TYPE.NOT_VISITED);
    // 시작점 찾기
    for (let x = 0; x < board.length; x++) {
        if (states[x] !== TYPE.NOT_VISITED) continue;
        let cur = x;
        states[cur] = TYPE.VISITED;
        while (true) {
            cur = board[cur];
            // 방문한 적 없었으면?
            if (states[cur] === TYPE.NOT_VISITED) {
                states[cur] = TYPE.VISITED;
                continue;
            } else {
                // 방문한 것에 다시 돌아왔으면
                if (cur === x) {
                    // 자기 자신: 방문했던 모든 것 사이클 처리
                    while (states[cur] === TYPE.VISITED) {
                        states[cur] = TYPE.CYCLE;
                        cur = board[cur];
                    }
                } else {
                    // 다른 것: 다른 것을 돌면서 사이클 처리, 나머지 방문한 건 사이클 아님
                    while (states[cur] === TYPE.VISITED) {
                        states[cur] = TYPE.CYCLE;
                        cur = board[cur];
                    }
                    // 나머지
                    cur = x;
                    while (states[cur] === TYPE.VISITED) {
                        states[cur] = TYPE.NOT_CYCLE;
                        cur = board[cur];
                    }
                }
                break;
            }
        }
    }
    console.log(states.filter((state) => state === TYPE.NOT_CYCLE).length);
}
