import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function returns 'Janvier' for 2022-01-01 as date", () => {
            const date = new Date("2022-01-01");
            const month = getMonth(date);
            expect(month).toBe("janvier");
        });

        it("the function returns 'Juillet' for 2022-07-08 as date", () => {
            const date = new Date("2022-07-08");
            const month = getMonth(date);
            expect(month).toBe("juillet");
        });
    });
});
