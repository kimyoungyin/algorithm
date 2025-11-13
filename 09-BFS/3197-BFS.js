const fs = require("fs");
const lines = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [X, Y] = lines[0].split(" ").map(Number);

const board = lines.slice(1).map((line) => line.split(""));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

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
        if (this.length === 0) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }
    pop() {
        if (!this.length) return undefined;
        const popped = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = popped.next;
        }
        this.length--;
        return popped.data;
    }
}

let count = 0;
let isPossible = false; // 두 백조가 만남?
const start = [];
const Q = new Queue(); // 물 BFS 큐
const Q2 = new Queue(); // 다음날 녹을 얼음
const LQ = new Queue(); // 백조 BFS 큐
const LQ2 = new Queue(); // 다음날 탐색 예정 얼음

// 백조 방문
const vis = Array(X)
    .fill()
    .map(() => Array(Y).fill(false));

// 물 방문
const visited = Array(X)
    .fill()
    .map(() => Array(Y).fill(false));

// 시작점 찾기 및 백조 하나 찾기
for (let x = 0; x < X; x++) {
    for (let y = 0; y < Y; y++) {
        if (board[x][y] === "L") {
            start.push(x);
            start.push(y);
        }
        if (board[x][y] !== "X") {
            Q.push([x, y]);
            visited[x][y] = true;
        }
    }
}

LQ.push([...start.slice(0, 2)]); // 백조 시작
board[start[0]][start[1]] = "."; // 백조 있던 자리도 물임
vis[start[0]][start[1]] = true;

while (!isPossible) {
    // 1. 얼음 녹이기
    // 1-1. 녹을 얼음 찾기
    while (Q.length) {
        const [curX, curY] = Q.pop();
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= X || ny < 0 || ny >= Y || visited[nx][ny])
                continue;
            if (board[nx][ny] === "X") {
                Q2.push([nx, ny]); // 녹을 얼음
                visited[nx][ny] = true;
            }
        }
    }
    // 1-2. 녹이기(Q2 -> Q1)
    while (Q2.length) {
        const [curX, curY] = Q2.pop();
        board[curX][curY] = ".";
        Q.push([curX, curY]);
    }

    // 백조 탐색
    while (LQ.length) {
        const [curX, curY] = LQ.pop();

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
            if (vis[nx][ny]) continue;
            if (board[nx][ny] === "X") {
                LQ2.push([nx, ny]); // 얼음이 녹아 탐색을 시작할 지점
                vis[nx][ny] = true;
                continue;
            }
            if (board[nx][ny] === "L") {
                isPossible = true;
                break;
            }
            // 물임
            LQ.push([nx, ny]);
            vis[nx][ny] = true;
        }
    }
    // 다음날 준비(LQ2 -> LQ1)
    while (LQ2.length) {
        const [curX, curY] = LQ2.pop();
        LQ.push([curX, curY]);
    }

    count++;
}

console.log(count);
