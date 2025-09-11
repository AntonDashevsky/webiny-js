import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import type { TableConstructor, TableDef } from "@webiny/db-dynamodb/toolbox.js";
import { Table } from "@webiny/db-dynamodb/toolbox.js";

interface Params {
    documentClient: DynamoDBDocument;
}

export const createTable = ({ documentClient }: Params): TableDef => {
    const config: TableConstructor<string, string, string> = {
        name: process.env.DB_TABLE_ELASTICSEARCH as string,
        partitionKey: "PK",
        sortKey: "SK",
        DocumentClient: documentClient,
        autoExecute: true,
        autoParse: true
    };

    return new Table(config);
};
