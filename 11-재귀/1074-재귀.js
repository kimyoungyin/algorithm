// r과 n은 0부터 카운트
const fs = require("fs");
const [N, r, c] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

function z(n, r, c) {
    if (n === 0) {
        return 0;
    }
    const val = Math.pow(2, n - 1);
    if (r < val && c < val) {
        return z(n - 1, r, c);
    }
    if (r < val && c >= val) {
        return z(n - 1, r, c - val) + val * val;
    }
    if (r >= val && c < val) {
        return z(n - 1, r - val, c) + val * val * 2;
    }
    return z(n - 1, r - val, c - val) + val * val * 3;
}

console.log(z(N, r, c));
