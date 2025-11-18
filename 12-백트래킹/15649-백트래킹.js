const fs = require("fs");
const [N, M] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

// 배경지식이 없다면?: K중 for문
// 대신 백트래킹을 활용해보자

const arr = Array(M).fill(0);
const isUsed = Array(N + 1).fill(0); // 숫자 === 인덱스

function f(k) {
    // base condition: k === M이면 이미 M개를 다 골랐다는 뜻
    if (k === M) {
        console.log(arr.join(" "));
        return;
    }
    for (let i = 1; i <= N; i++) {
        if (!isUsed[i]) {
            arr[k] = i;
            isUsed[i] = 1;
            f(k + 1);
            isUsed[i] = 0;
        }
    }
}
f(0);
