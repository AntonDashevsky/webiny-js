import { TableModifier } from "../types.js";
import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { Table } from "@webiny/db-dynamodb/toolbox.js";
import { TableConstructor } from "@webiny/db-dynamodb/toolbox.js";

interface Params {
    table?: TableModifier;
    documentClient: DynamoDBDocument;
}
export const createTable = ({ table, documentClient }: Params): Table<string, string, string> => {
    const tableConfig: TableConstructor<string, string, string> = {
        name: process.env.DB_TABLE_ADMIN_SETTINGS || (process.env.DB_TABLE as string),
        partitionKey: "PK",
        sortKey: "SK",
        DocumentClient: documentClient,
        autoExecute: true,
        autoParse: true
    };

    const config = typeof table === "function" ? table(tableConfig) : tableConfig;

    return new Table(config);
};
