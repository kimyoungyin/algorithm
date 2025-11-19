const fs = require("fs");
const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

for (const line of lines.slice(0, lines.length - 1)) {
    const [_, ...nums] = line.split(" ").map(Number);
    const idxs = Array(6).fill(0);
    let ans = "";

    const solution = (k) => {
        if (k === 6) {
            ans += idxs.map((idx) => nums[idx]).join(" ") + "\n";
            return;
        }
        // 본인 인덱스 이후부터: 0일 때 제외
        for (let i = k > 0 ? idxs[k - 1] + 1 : 0; i < nums.length; i++) {
            idxs[k] = i;
            solution(k + 1);
        }
    };

    solution(0);

    console.log(ans);
}
