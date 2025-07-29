import type { SecurityContext } from "@webiny/api-security/types";
import type { TenancyContext } from "@webiny/api-tenancy/types";

export type TestContext = SecurityContext & TenancyContext;
