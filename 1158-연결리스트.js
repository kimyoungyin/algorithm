const fs = require("fs");
const [N, K] = fs
    .readFileSync("a.txt")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

// 원형 연결 리스트 생성
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}
let curr;
let head;
for (let i = 1; i <= N; i++) {
    const newNode = new Node(i);
    if (!curr) {
        curr = newNode;
        head = curr;
    } else {
        newNode.prev = curr;
        curr.next = newNode;
        if (i === N) {
            newNode.next = head;
            head.prev = newNode;
        }
        curr = newNode;
    }
}

// 첫 노드로 복귀
curr = head;

// next가 null일 때까지 K번째를 제거;
let arr = [];
let count = 1;
while (arr.length < N) {
    if (count === K) {
        arr.push(curr.data);
        count = 1; // 초기화
        if (curr.prev) curr.prev.next = curr.next;
        if (curr.next) curr.next.prev = curr.prev;
    } else {
        count++;
    }
    curr = curr.next;
}

console.log("<" + arr.join(", ") + ">");
