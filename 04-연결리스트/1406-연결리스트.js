const fs = require("fs");
const [str, _, ...lines] = fs
    .readFileSync("a.txt")
    .toString()
    .trim()
    .split("\n");

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}
// 빈 곳을 의미(더미 노드)
let cursoredNode = new Node("");
for (let char of str) {
    const newNode = new Node(char);
    newNode.prev = cursoredNode;
    cursoredNode.next = newNode;
    cursoredNode = newNode;
}

for (let commandLine of lines) {
    const args = commandLine.split(" ");
    if (args[0] === "L") {
        if (cursoredNode.prev) cursoredNode = cursoredNode.prev;
    } else if (args[0] === "D") {
        if (cursoredNode.next) cursoredNode = cursoredNode.next;
    } else if (args[0] === "B") {
        // prev가 null임: 끝
        if (!cursoredNode.prev) continue;
        // prev가 null이 아님
        // - cursor을 prev로 옮김
        // - cursor.next = cursor.next.next;
        // - cursor.next.prev = cursor;
        cursoredNode = cursoredNode.prev;
        cursoredNode.next = cursoredNode.next.next;
        if (cursoredNode.next) cursoredNode.next.prev = cursoredNode;
    } else if (args[0] === "P") {
        const newNode = new Node(args[1]);
        // 새 노드 수정
        newNode.prev = cursoredNode;
        newNode.next = cursoredNode.next;
        // 기존 노드 수정
        if (cursoredNode.next) cursoredNode.next.prev = newNode;
        cursoredNode.next = newNode;
        cursoredNode = newNode;
    }
}

let answer = "";
while (cursoredNode.data !== "") {
    cursoredNode = cursoredNode.prev;
}

while (cursoredNode) {
    answer += cursoredNode.data;
    cursoredNode = cursoredNode.next;
}
console.log(answer);
