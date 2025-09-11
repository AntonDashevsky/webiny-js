import type { Plugin } from "@webiny/plugins";
import { ContextPlugin } from "@webiny/api";
import type { Context } from "~/types.js";
import { createTaskModel } from "./crud/model.js";
import { createDefinitionCrud } from "./crud/definition.tasks.js";
import { createServiceCrud } from "~/crud/service.tasks.js";
import { createTaskCrud } from "./crud/crud.tasks.js";
import { createTestingRunTask } from "~/tasks/testingRunTask.js";
import { createServicePlugins } from "~/service/index.js";

const createTasksCrud = () => {
    const plugin = new ContextPlugin<Context>(async context => {
        context.tasks = {
            ...createDefinitionCrud(context),
            ...createTaskCrud(context),
            ...createServiceCrud(context)
        };
    });

    plugin.name = "tasks.context";

    return plugin;
};

const createTasksContext = (): Plugin[] => {
    return [...createServicePlugins(), ...createTaskModel(), createTasksCrud()];
};

export const createBackgroundTaskContext = (): Plugin[] => {
    return [createTestingRunTask(), ...createTasksContext()];
};
