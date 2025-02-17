import { ElasticsearchContext } from "@webiny/api-elasticsearch/types.js";
import { CmsContext } from "@webiny/api-headless-cms/types/index.js";
import { Context as TasksContext } from "@webiny/tasks/types.js";

export * from "./tasks/MockDataManager/types.js";

export interface Context extends CmsContext, ElasticsearchContext, TasksContext {}
