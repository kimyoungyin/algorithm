// 풀이2: 재귀 풀이
const fs = require("fs");
const [A, B, C] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(BigInt);

function func1(a, b, c) {
    if (b === 1n) return a % c;
    // 모듈러 연산으로 각 연산마다 나눠줘야 함
    const val = func1(a, b / 2n, c) % c; // BigInt는 무조건 내림
    if (b % 2n === 0n) {
        return (val * val) % c;
    } else {
        // 홀수면
        return (((val * val) % c) * (a % c)) % c;
    }
}

console.log(func1(A, B, C).toString());
