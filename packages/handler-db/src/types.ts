import { Db } from "@webiny/db";
import { Context } from "@webiny/api/types.js";

export interface DbContext extends Context {
    db: Db<unknown>;
}
