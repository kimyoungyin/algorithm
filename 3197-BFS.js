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
    push_back(data) {
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
    pop_front() {
        if (!this.length) return undefined;
        const popped = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = popped.next;
        }
        this.length--;
        return popped;
    }
}

// 메모리 초과로 재사용
const vis = Array(X)
    .fill()
    .map(() => Array(Y).fill(false)); // false or 1 or 2

const bfs = (idxs) => {
    const q = new Queue();
    const edges = [];

    idxs.forEach((arr) => {
        q.push_back([...arr]); // x, y, 백조 식별자(1 or 2)
        vis[arr[0]][arr[1]] = arr[2];
    });
    while (q.length) {
        const [curX, curY, name] = q.pop_front().data;

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= X || ny < 0 || ny >= Y) continue;
            if (board[nx][ny] === "X") {
                edges.push([nx, ny, name]); // 벽을 더하기
                continue;
            }
            if (vis[nx][ny] !== false) {
                if (vis[nx][ny] === name) continue;
                return true;
            }
            q.push_back([nx, ny, name]);
            vis[nx][ny] = name;
        }
    }
    return edges;
};

let Lidxs = [];
let nameIdx = 1;
for (let x = 0; x < X; x++) {
    for (let y = 0; y < Y; y++) {
        if (board[x][y] === "L") Lidxs.push([x, y, nameIdx++]);
    }
}

let ans = 0;

while (1) {
    const connectedOrEdges = bfs(Lidxs);
    if (!Array.isArray(connectedOrEdges)) {
        console.log(ans);
        break;
    } else {
        Lidxs = connectedOrEdges;
    }
    ans++;
    Lidxs.forEach((arr) => {
        board[arr[0]][arr[1]] = ".";
    });
}
