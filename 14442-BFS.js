// 0만 이동 가능, 시작 끝 포함해서 셈, 벽 부수고 K번 이동 가능, 불가능할 때는 -1 출력
// 2차 시도: 큐 직접 구현
const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.split("").map(Number));

const dis = Array(N)
    .fill()
    .map(() =>
        Array(M)
            .fill()
            .map(() => Array(K + 1).fill(-1))
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
    push(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
            this.length++;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.length++;
        }
    }
    pop_front() {
        if (this.head === null) {
            return undefined;
        }
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

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

q.push([0, 0, 0]);
dis[0][0][0] = 1;

while (q.length) {
    const [curX, curY, k] = q.pop_front().data;

    for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        // 빈 공간인데 방문 안했을 때
        if (board[nx][ny] === 0 && dis[nx][ny][k] === -1) {
            q.push([nx, ny, k]);
            dis[nx][ny][k] = dis[curX][curY][k] + 1;
        }
        // 벽인데 k+1로 방문 안했을 때, k+1이 K 이하라면
        if (board[nx][ny] && dis[nx][ny][k + 1] === -1 && k + 1 <= K) {
            q.push([nx, ny, k + 1]);
            dis[nx][ny][k + 1] = dis[curX][curY][k] + 1;
        }
    }
}

const possibleCount = dis[N - 1][M - 1]
    .filter((count) => count !== -1)
    .sort((a, b) => a - b);

if (possibleCount.length === 0) {
    console.log(-1);
} else {
    console.log(possibleCount[0]);
}
