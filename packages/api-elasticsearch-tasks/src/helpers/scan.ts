import { scan as tableScan, type ScanOptions } from "@webiny/db-dynamodb";
import { type TableDef } from "@webiny/db-dynamodb/toolbox.js";
import { type IElasticsearchIndexingTaskValuesKeys } from "~/types.js";

interface Params {
    table: TableDef;
    keys?: IElasticsearchIndexingTaskValuesKeys;
    options?: ScanOptions;
}

export const scan = async <T = any>(params: Params) => {
    const { table, keys } = params;
    return tableScan<T>({
        table,
        options: {
            ...params.options,
            startKey: keys,
            limit: params.options?.limit || 200
        }
    });
};
