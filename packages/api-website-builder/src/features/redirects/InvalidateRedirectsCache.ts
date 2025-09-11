import type { ITasksContextObject } from "@webiny/tasks";

export class InvalidateRedirectsCache {
    private readonly path = "/wb/redirects";
    private tasks: ITasksContextObject;

    constructor(tasks: ITasksContextObject) {
        this.tasks = tasks;
    }

    async execute(): Promise<void> {
        await this.tasks.trigger({
            definition: "cloudfrontInvalidateCache",
            input: {
                caller: "wb.redirects",
                paths: [this.path]
            }
        });
    }
}
