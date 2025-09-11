import type { AcoContext } from "@webiny/api-aco/types";
import type { CmsContext } from "@webiny/api-headless-cms/types";
import type { Context as BaseContext } from "@webiny/handler/types";

export interface HcmsAcoContext extends BaseContext, AcoContext, CmsContext {}
