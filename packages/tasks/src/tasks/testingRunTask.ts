import { createTaskDefinition } from "~/task/index.js";

export const createTestingRunTask = () => {
    return createTaskDefinition({
        id: "testingRun",
        title: "A mock task to test run the step function permissions.",
        run: async ({ response }) => {
            return response.done("Task successfully finished.");
        }
    });
};
