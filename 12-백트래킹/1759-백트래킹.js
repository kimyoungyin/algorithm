// 최소 한 개의 모음. 최소 두 개의 자음. 오름차순. 서로 다름.
const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [L, C] = lines[0].split(" ").map(Number);
const alphas = lines[1].split(" ").sort();

const used = {
    a: 0,
    b: 0,
};

const isA = (char) =>
    char === "a" ||
    char === "e" ||
    char === "i" ||
    char === "o" ||
    char === "u";

const idxs = Array(L).fill(" ");

let ans = "";
const solution = (k) => {
    if (k === L) {
        if (used.a >= 1 && used.b >= 2) {
            ans += idxs.map((idx) => alphas[idx]).join("") + "\n";
        }
        return;
    }
    let start = 0;
    if (k > 0) start = idxs[k - 1] + 1;
    for (let i = start; i < C; i++) {
        if (isA(alphas[i])) {
            used.a++;
            idxs[k] = i;
            solution(k + 1);
            used.a--;
        } else {
            used.b++;
            idxs[k] = i;
            solution(k + 1);
            used.b--;
        }
    }
};

solution(0);

console.log(ans.trim());
