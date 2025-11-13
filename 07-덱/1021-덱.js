const fs = require("fs");
const [[N, M], [...nums]] = fs
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

const MX = 1000005;
const arr = Array.from({ length: 2 * MX + 1 }, () => 0);
let head = MX,
    tail = MX;

const push_back = (el) => {
    arr[tail++] = el;
};

const pop_front = () => {
    head++;
};

const rotate_right = () => {
    const toFirst = arr[tail - 1];
    arr[--head] = toFirst;
    tail--;
};

const rotate_left = () => {
    const toLast = arr[head];
    head++;
    arr[tail++] = toLast;
};

const findShortcut = (el) => {
    // head부터 찾기
    const idx = arr.indexOf(el, head);
    const countToLeft = idx - head;
    const countToRight = tail - idx;
    if (countToLeft < countToRight)
        return { fn: rotate_left, count: countToLeft };
    return { fn: rotate_right, count: countToRight };
};

// 초기화
for (let i = 1; i <= N; i++) {
    push_back(i);
}

let answer = 0;
for (const num of nums) {
    const { fn, count } = findShortcut(num);
    for (let i = 0; i < count; i++) {
        fn();
    }
    pop_front();
    answer += count;
}

console.log(answer);
