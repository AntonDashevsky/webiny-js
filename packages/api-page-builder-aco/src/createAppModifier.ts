import {
    createAcoAppModifier as baseCreateAppModifier,
    CreateAcoAppModifierCallable
} from "@webiny/api-aco";
import { PB_PAGE_TYPE } from "~/contants.js";
import { PbAcoContext } from "~/types.js";
import { Context } from "@webiny/handler/types.js";

export const createAppModifier = <T extends Context = PbAcoContext>(
    cb: CreateAcoAppModifierCallable<T>
) => {
    return baseCreateAppModifier<T>(PB_PAGE_TYPE, cb);
};
