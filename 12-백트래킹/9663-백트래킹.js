const fs = require("fs");
const N = +fs.readFileSync("../dev/stdin").toString().trim();

// 효율적 풀이: y, 대각선1, 대각선2의 isUsed 배열을 체크하기
// isUsed2의 방정식을 구하는 과정이 매우 힘들었다.
const isUsedY = Array(N).fill(0); // i = y
const isUsed1 = Array(2 * N - 1).fill(0); // i = x + y
const isUsed2 = Array(2 * N - 1).fill(0); // i = x - y + N -1

let cnt = 0;
// x좌표마다
function f(x) {
    // 좌표 벗어남. 각 행마다 하나씩 다 놓은 상태
    if (x === N) {
        cnt++;
        return;
    }

    // 찾기: 특정 좌표에 퀸을 둘 수 있는지를 어떻게 판단할 것인가?
    // y가 0~N-1까지 넘어가며 살펴보기
    for (let y = 0; y < N; y++) {
        if (isUsedY[y] || isUsed1[x + y] || isUsed2[x - y + N - 1]) continue;
        // 모두 아니라면 가능!
        isUsedY[y] = 1;
        isUsed1[x + y] = 1;
        isUsed2[x - y + N - 1] = 1;
        f(x + 1);
        isUsedY[y] = 0;
        isUsed1[x + y] = 0;
        isUsed2[x - y + N - 1] = 0;
    }
}

f(0);

console.log(cnt);
