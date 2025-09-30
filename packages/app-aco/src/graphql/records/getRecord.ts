import type { AcoModel } from "~/types.js";
import { createReadQuery } from "@webiny/app-headless-cms-common";

export const createGetRecord = (model: AcoModel) => {
    return createReadQuery(model);
};
