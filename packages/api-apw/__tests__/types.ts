import type { Context as BaseContext } from "@webiny/api/types";
import type { TenancyContext } from "@webiny/api-tenancy/types";
import type { SecurityContext } from "@webiny/api-security/types";

export interface TestContext extends BaseContext, SecurityContext, TenancyContext {}
