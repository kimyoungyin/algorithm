const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, S] = lines[0].split(" ").map(Number);

// 합을 구하는 것이니 수열보단 조합과 동일한 상황
const arr = lines[1].split(" ").map(Number);
let cnt = 0;
// k인덱스 요소를 고를지 안 고를지
function f(k, sum) {
    if (k === N) {
        if (sum === S) cnt++;
        return;
    }

    // 선택
    f(k + 1, sum + arr[k]);
    f(k + 1, sum);
    // 선택 안함
}

f(0, 0); // 이 숫자를 선택할 것인지 말 것인지

// 주의: 크기가 양수인 부분집합만 허용하므로 공집합은 포함하지 않는다
console.log(S === 0 ? cnt - 1 : cnt);
