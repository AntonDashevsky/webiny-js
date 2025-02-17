import { AcoContext } from "@webiny/api-aco/types.js";
import { CmsContext } from "@webiny/api-headless-cms/types/index.js";
import { Context as BaseContext } from "@webiny/handler/types.js";

export interface HcmsAcoContext extends BaseContext, AcoContext, CmsContext {}
