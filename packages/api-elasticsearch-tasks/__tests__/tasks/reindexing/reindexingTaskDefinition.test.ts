import { createElasticsearchReindexingTask } from "~/tasks/index.js";

describe("reindexing task definition", () => {
    it("should return a task definition", async () => {
        const task = createElasticsearchReindexingTask();
        expect(task.id).toEqual("elasticsearchReindexing");
        expect(task.title).toEqual("Elasticsearch reindexing");
        expect(task.run).toEqual(expect.any(Function));
    });
});
