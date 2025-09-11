import type { TenancyContext } from "@webiny/api-tenancy/types.js";
import type { DbContext } from "@webiny/handler-db/types.js";

export type Context = TenancyContext & DbContext;
