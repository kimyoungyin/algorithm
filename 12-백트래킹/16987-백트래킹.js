// 계란 부딪힘 -> 내 내구도 -= 상대 무게
// 내구도 0 이하 순간 깨짐
const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const T = +lines[0];

const eggs = lines.slice(1).map((line) => line.split(" ").map(Number));

const 내구도 = 0;
const 무게 = 1;

// 시작은 무조건 맨 왼쪽
// 그 다음 고르는 건 상관 없음

let max = 0;
let count = 0;

const isBroken = (idx) => eggs[idx][내구도] <= 0;

const solution = (k) => {
    if (k === T) {
        max = Math.max(count, max);
        return;
    }

    if (isBroken(k) || count === T - 1) return solution(k + 1);

    // 모두 칠 수 있어야 한다
    for (let target = 0; target < T; target++) {
        if (isBroken(target) || target === k) continue;
        eggs[k][내구도] -= eggs[target][무게];
        eggs[target][내구도] -= eggs[k][무게];
        if (isBroken(k)) count++;
        if (isBroken(target)) count++;
        solution(k + 1);
        // 먼저 부쉈었는지 확인 후 복구(복구를 먼저 하면 안됨)
        if (isBroken(k)) count--;
        if (isBroken(target)) count--;
        eggs[k][내구도] += eggs[target][무게];
        eggs[target][내구도] += eggs[k][무게];
    }
};

solution(0);
console.log(max);
