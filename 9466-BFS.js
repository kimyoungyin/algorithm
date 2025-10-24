const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const ans = [];

for (let i = 1; i < lines.length; i += 2) {
    const board = lines[i + 1].split(" ").map((order) => Number(order) - 1);
    // 사이클 도는 중
    const vis = Array(board.length).fill(false);

    // bfs
    for (let x = 0; x < board.length; x++) {
        if (vis[x]) continue; // 이미 팀이 맺어졌으면 생략
        const q = [];
        let head = 0;
        q.push([x, board[x], [x]]); // 현재 위치, 다음 지점, 팀짜기 시작 위치
        vis[x] = true;

        while (head < q.length) {
            const [curX, nx, teams] = q[head++];

            // nx === teams[0]면 nx도 추가하고 팀 확정 break;
            if (nx === teams[0]) {
                vis[nx] = true;
                break;
            }
            // 아니면
            if (!vis[nx]) {
                // 1. nx 방문한 적이 없음 -> 이동
                q.push([nx, board[nx], [...teams, nx]]);
                vis[nx] = true;
            } else {
                // 2. nx 방문한 적이 있음 -> 팀이 이루어지지 않음 초기화 및 break;
                for (let team of teams) {
                    vis[team] = false;
                }
                break;
            }
        }
    }
    ans.push(vis.filter((el) => !el).length);
}

console.log(ans.join("\n"));
