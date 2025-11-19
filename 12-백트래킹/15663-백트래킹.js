const fs = require("fs");

const lines = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [_, M] = lines[0].split(" ").map(Number);

const nums = lines[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

let idxsRest = Array(nums[nums.length - 1] + 1).fill(0);

nums.forEach((num) => {
    idxsRest[num]++;
});

idxsRest = idxsRest.filter((count) => count !== 0);

const uniqueNums = [...new Set(nums)];

const idxs = Array(M).fill(-1);

let ans = "";

const solution = (k) => {
    if (k === M) {
        ans += idxs.map((idx) => uniqueNums[idx]).join(" ") + "\n";
        return;
    }
    for (let i = 0; i < uniqueNums.length; i++) {
        if (!idxsRest[i]) continue;
        idxsRest[i]--;
        idxs[k] = i;
        solution(k + 1);
        idxsRest[i]++;
    }
};

solution(0);

console.log(ans.trim());
