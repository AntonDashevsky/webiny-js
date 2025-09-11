import type { CreateAcoAppModifierCallable } from "@webiny/api-aco";
import { createAcoAppModifier as baseCreateAppModifier } from "@webiny/api-aco";
import { PB_PAGE_TYPE } from "~/contants";
import type { PbAcoContext } from "~/types";
import type { Context } from "@webiny/handler/types";

export const createAppModifier = <T extends Context = PbAcoContext>(
    cb: CreateAcoAppModifierCallable<T>
) => {
    return baseCreateAppModifier<T>(PB_PAGE_TYPE, cb);
};
