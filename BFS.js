// 2차원 배열로 보드 정의 (1이 파란 칸, 0이 빨간 칸)
const board = [
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// 방문 여부를 저장하는 2차원 배열
const vis = Array(7)
    .fill()
    .map(() => Array(10).fill(false));

const n = 7; // 행의 수
const m = 10; // 열의 수

// 상하좌우 네 방향을 의미하는 배열
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

// BFS 구현
function bfs() {
    const queue = [];

    // 시작점 (0, 0)을 방문했다고 표시하고 큐에 추가
    vis[0][0] = true;
    queue.push([0, 0]);

    while (queue.length > 0) {
        const [curX, curY] = queue.shift(); // 큐에서 현재 위치 꺼내기
        console.log(`(${curX}, ${curY}) -> `);

        // 상하좌우 네 방향 탐색
        for (let dir = 0; dir < 4; dir++) {
            const nx = curX + dx[dir];
            const ny = curY + dy[dir];

            // 범위를 벗어나면 건너뛰기
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

            // 이미 방문했거나 파란 칸이 아니면 건너뛰기
            if (vis[nx][ny] || board[nx][ny] !== 1) continue;

            // 방문 표시하고 큐에 추가
            vis[nx][ny] = true;
            queue.push([nx, ny]);
        }
    }
}

// BFS 실행
bfs();
