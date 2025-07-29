import type { ElasticsearchContext } from "@webiny/api-elasticsearch/types";
import type { CmsContext } from "@webiny/api-headless-cms/types";
import type { Context as TasksContext } from "@webiny/tasks/types";

export * from "./tasks/MockDataManager/types";

export interface Context extends CmsContext, ElasticsearchContext, TasksContext {}
