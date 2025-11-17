const fs = require("fs");
const [N, step] = fs
    .readFileSync("../dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);

const f = (width, step) => {
    if (width === 2) {
        if (step === 1) return [1, 1];
        if (step === 2) return [1, 2];
        if (step === 3) return [2, 2];
        if (step === 4) return [2, 1];
    }
    const prevWidth = Math.pow(2, Math.log2(width) - 1);
    const prevStep = prevWidth * prevWidth;

    if (step <= prevStep) {
        const [x, y] = f(prevWidth, step);
        return [y, x];
    } else if (step <= prevStep * 2) {
        const [x, y] = f(prevWidth, step - prevStep);
        return [x, y + prevWidth];
    } else if (step <= prevStep * 3) {
        const [x, y] = f(prevWidth, step - prevStep * 2);
        return [x + prevWidth, y + prevWidth];
    } else {
        const [x, y] = f(prevWidth, step - prevStep * 3);
        return [width + 1 - y, prevWidth + 1 - x];
    }
};

console.log(f(N, step).join(" "));
