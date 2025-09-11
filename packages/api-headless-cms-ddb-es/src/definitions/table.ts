import type { TableModifier } from "~/types";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import type { TableConstructor } from "@webiny/db-dynamodb/toolbox";
import { Table } from "@webiny/db-dynamodb/toolbox";

export interface CreateTableParams {
    table?: TableModifier;
    documentClient: DynamoDBDocument;
}
export const createTable = ({
    table,
    documentClient
}: CreateTableParams): Table<string, string, string> => {
    const tableConfig: TableConstructor<string, string, string> = {
        name: process.env.DB_TABLE_HEADLESS_CMS || (process.env.DB_TABLE as string),
        partitionKey: "PK",
        sortKey: "SK",
        DocumentClient: documentClient,
        autoExecute: true,
        autoParse: true
    };

    const config = typeof table === "function" ? table(tableConfig) : tableConfig;

    return new Table(config);
};
