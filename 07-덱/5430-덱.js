const fs = require("fs");
const [T, ...input] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");

// 배열이 비어있는데 D 사용 error
// 뒤집는 로직을 실제로 수행하진 않고, 읽는 방향이 반대로 바뀐다고 관념적으로 변경해보자
// 시간 초과가 안나는 핵심은 뒤집어야 할 때 실제로 뒤집지 않는 것
// 틀림: MX를 너무 크게 잡음
// 참고: 단순하게 shift를 써도 통과는 한다.

const answer = [];

for (let i = 0; i < T; i++) {
    const MX = 100000;
    const deq = Array.from({ length: 2 * MX + 1 }, () => 0);
    let head = MX,
        tail = MX;

    let isReversed = 0;

    const popFront = () => {
        head++;
    };

    const popBack = () => {
        tail--;
    };

    const pushBack = (el) => {
        deq[tail++] = el;
    };

    const reverse = () => {
        isReversed = !isReversed;
    };
    const fns = input[i * 3];
    const arr = input[i * 3 + 2]
        .substring(1, input[i * 3 + 2].length - 1)
        .split(",") // 빈 배열은 [""]로 변환
        .map(Number)
        .filter((num) => num); // 빈 배열 처리
    for (let j = 0; j < arr.length; j++) {
        pushBack(arr[j]);
    }
    let isError = false;

    for (const fn of fns) {
        if (fn === "R") reverse();
        else {
            if (tail - head === 0) {
                isError = true;
                break;
            }
            isReversed ? popBack() : popFront();
        }
    }
    if (isError) answer.push("error");
    else {
        const result = deq.slice(head, tail).filter((el) => el);
        answer.push(
            "[" + (isReversed ? result.reverse() : result).toString() + "]"
        );
    }
}

console.log(answer.join("\n"));
