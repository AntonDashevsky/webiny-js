import { type ElasticsearchContext } from "@webiny/api-elasticsearch/types.js";
import { type CmsContext } from "@webiny/api-headless-cms/types/index.js";
import { type Context as TasksContext } from "@webiny/tasks/types.js";

export * from "./tasks/MockDataManager/types.js";

export interface Context extends CmsContext, ElasticsearchContext, TasksContext {}
