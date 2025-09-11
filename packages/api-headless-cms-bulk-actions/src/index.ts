import { createHandlers } from "~/handlers/index.js";
import { createDefaultGraphQL } from "~/plugins/index.js";

export type * from "./abstractions/index.js";
export * from "./handlers/index.js";
export * from "./useCases/index.js";
export * from "./plugins/index.js";
export * from "./tasks/index.js";

export const createHcmsBulkActions = () => [createHandlers(), createDefaultGraphQL()];
