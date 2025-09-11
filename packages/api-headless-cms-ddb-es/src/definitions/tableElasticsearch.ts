import type { TableModifier } from "~/types.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import { Table } from "@webiny/db-dynamodb/toolbox.js";
import type { TableConstructor } from "@webiny/db-dynamodb/toolbox.js";

export interface CreateElasticsearchTableParams {
    table?: TableModifier;
    documentClient: DynamoDBDocument;
}
export const createElasticsearchTable = ({
    table,
    documentClient
}: CreateElasticsearchTableParams): Table<string, string, string> => {
    const tableConfig: TableConstructor<string, string, string> = {
        name: process.env.DB_TABLE_ELASTICSEARCH as string,
        partitionKey: "PK",
        sortKey: "SK",
        DocumentClient: documentClient,
        autoExecute: true,
        autoParse: true
    };

    const config = typeof table === "function" ? table(tableConfig) : tableConfig;

    return new Table(config);
};
