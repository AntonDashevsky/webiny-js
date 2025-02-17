import { createMockDataManagerTask } from "~/tasks/createMockDataManagerTask.js";
import { createMockDataCreatorTask } from "~/tasks/createMockDataCreatorTask.js";

export * from "./tasks/createMockDataManagerTask.js";
export * from "./tasks/createMockDataCreatorTask.js";

export const createHeadlessCmsEsTasks = () => [
    createMockDataManagerTask(),
    createMockDataCreatorTask()
];
