import { createTable } from "~/db/table.js";
import { createEntity } from "~/db/entity.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";

interface IParams {
    documentClient: DynamoDBDocument;
    table?: string;
}

export const create = (params: IParams) => {
    const name = params.table || process.env.DB_TABLE_LOG;
    if (!name) {
        throw new Error("Missing table name when creating a logger table.");
    }
    const table = createTable({
        documentClient: params.documentClient,
        name
    });

    const entity = createEntity({
        table
    });
    return {
        table,
        entity
    };
};
