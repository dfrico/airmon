const trafjs = require("./traffic.js");

const traffic = trafjs.t;

test("adds 1 + 2 to equal 3", () => {
    expect(traffic(1, 2)).toBe(3);
});