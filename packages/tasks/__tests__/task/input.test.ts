import { createTaskInput } from "~/task/index.js";

interface MyInput {
    test: boolean;
    file: string;
}

describe("task input", () => {
    it("should create task input", async () => {
        const input = createTaskInput<MyInput>({
            id: "aMockTaskType",
            input: {
                test: true,
                file: "test.txt"
            }
        });

        expect(input).toEqual({
            id: "aMockTaskType",
            input: {
                test: true,
                file: "test.txt"
            }
        });
    });
});
