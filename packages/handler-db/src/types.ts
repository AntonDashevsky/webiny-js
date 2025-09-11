import type { Db } from "@webiny/db";
import type { Context } from "@webiny/api/types";

export interface DbContext extends Context {
    db: Db<unknown>;
}
