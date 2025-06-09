import { createContextPlugin, type ICreateLoggerContextParams } from "./context.js";
import { createLifecycle } from "./lifecycle.js";
import { createPruneLogsTask } from "~/tasks/createPruneLogsTask.js";

export const createLogger = (params?: ICreateLoggerContextParams) => {
    return [createLifecycle(), createContextPlugin(params), createPruneLogsTask()];
};
