// 최단 경로, 시작하는 칸 포함, 같은 같에 머무르기도 가능(+1), 이동할 때(머무르기 포함)마다 낮/밤 바뀜
// 벽은 낮에만 부수기 가능, 벽은 최대 K번 부수기 가능
// 4차원 배열.. 풀이는 동일하나 시간 초과 발생
const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.split("").map(Number));

const dis = Array(N)
    .fill()
    .map(() =>
        Array(M)
            .fill()
            .map(() =>
                Array(K + 1)
                    .fill()
                    .map(() => [-1, -1])
            )
    );

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push_back(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }
    pop_front() {
        if (this.head === null) return;
        const popped = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.length--;
        return popped;
    }
}

const q = new Queue();
q.push_back([0, 0, 0, 0]); // x, y, 벽 부순 횟수, 밤인지
dis[0][0][0][0] = 1;

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
// 가만히 있는 것을 허용하는 것은 벽을 부수고 싶은데 밤이어서 못 부술 때만
while (q.length) {
    const [curX, curY, k, isNight] = q.pop_front().data;

    if (curX === N - 1 && curY === M - 1) {
        console.log(dis[curX][curY][k][isNight]);
        process.exit(0);
    }

    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];
        const nt = isNight ? 0 : 1;
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        // 빈칸
        if (board[nx][ny] === 0) {
            // 방문한 적 없을 때만
            if (dis[nx][ny][k][nt] === -1) {
                q.push_back([nx, ny, k, nt]);
                dis[nx][ny][k][nt] = dis[curX][curY][k][isNight] + 1;
            }
        } else {
            // 벽
            // 1. 이미 다 깸
            if (k === K) continue;
            // 2. 낮일 때
            if (!isNight) {
                // 방문한 적 없으면 추가
                if (dis[nx][ny][k + 1][nt] === -1) {
                    q.push_back([nx, ny, k + 1, nt]);
                    dis[nx][ny][k + 1][nt] = dis[curX][curY][k][isNight] + 1;
                }
            } else {
                // 3. 밤일 때
                // 방문한 적 없으면 기다리기
                if (dis[curX][curY][k][nt] === -1) {
                    q.push_back([curX, curY, k, nt]);
                    dis[curX][curY][k][nt] = dis[curX][curY][k][isNight] + 1;
                }
            }
        }
    }
}

console.log(-1);
