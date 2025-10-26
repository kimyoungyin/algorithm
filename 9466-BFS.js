// 한 번 더 회전하는 것에 부담을 느끼지 말라 2*N = N
const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const ans = [];

const type = {
    notVisited: 0,
    visited: 1,
    notCycle: 2,
    cycle: 3,
};

for (let i = 1; i < lines.length; i += 2) {
    const board = lines[i + 1].split(" ").map((order) => Number(order) - 1); // 인덱스화
    // 사이클 도는 중
    const states = Array(board.length)
        .fill()
        .map(() => type.notVisited);

    for (let x = 0; x < states.length; x++) {
        if (states[x] !== type.notVisited) continue; // 방문한 적이 없으면 시작
        // 초기화 및 bfs 진행
        let curX = x;
        while (true) {
            states[curX] = type.visited;
            curX = board[curX];

            // 이미 사이클이 아니거나, 사이클임이 확정되었을 떄 -> 지금까지 방문했던 것은 모두 사이클이 아님
            if (states[curX] === type.notCycle || states[curX] === type.cycle) {
                curX = x;
                while (states[curX] === type.visited) {
                    states[curX] = type.notCycle;
                    curX = board[curX];
                }
                break;
            }
            // 방문했던 사람 y을 또 마주했을 때. x -> y 전까지는 사이클이 아니고, y -> y전까지는 사이클임
            if (states[curX] === type.visited && curX !== x) {
                while (states[curX] !== type.cycle) {
                    states[curX] = type.cycle;
                    curX = board[curX];
                }
                curX = x;
                while (states[curX] !== type.cycle) {
                    states[curX] = type.notCycle;
                    curX = board[curX];
                }
                break;
            }
            // 자기 자신을 다시 마주쳤을 때: 지금까지 방문했던 것은 모두 사이클임
            if (states[curX] === type.visited && curX === x) {
                while (states[curX] !== type.cycle) {
                    states[curX] = type.cycle;
                    curX = board[curX];
                }
                break;
            }
        }
    }
    ans.push(states.filter((state) => state === type.notCycle).length);
}

console.log(ans.join("\n"));
