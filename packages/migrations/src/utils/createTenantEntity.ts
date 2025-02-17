import { Table } from "@webiny/db-dynamodb/toolbox.js";
import { createStandardEntity } from "~/utils/index.js";

export const createTenantEntity = (table: Table<string, string, string>) => {
    return createStandardEntity(table, "TenancyTenant");
};
