import { Entity, type Table } from "@webiny/db-dynamodb/toolbox.js";
import { type Attributes } from "~/types.js";

interface Params {
    table: Table<string, string, string>;
    entityName: string;
    attributes: Attributes;
}

export const createPageElasticsearchEntity = (params: Params): Entity<any> => {
    const { entityName, attributes, table } = params;
    return new Entity({
        name: entityName,
        table,
        attributes: {
            PK: {
                partitionKey: true
            },
            SK: {
                sortKey: true
            },
            index: {
                type: "string"
            },
            data: {
                type: "map"
            },
            TYPE: {
                type: "string"
            },
            ...(attributes || {})
        }
    });
};
