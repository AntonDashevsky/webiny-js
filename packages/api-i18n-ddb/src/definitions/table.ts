import { Table } from "@webiny/db-dynamodb/toolbox.js";
import { getDocumentClient, getTable } from "~/operations/utils.js";
import { I18NContext } from "@webiny/api-i18n/types.js";

export default (params: { context: I18NContext }): Table<string, string, string> => {
    const { context } = params;
    return new Table({
        name: process.env.DB_TABLE || getTable(context),
        partitionKey: "PK",
        sortKey: "SK",
        DocumentClient: getDocumentClient(context),
        autoExecute: true,
        autoParse: true
    });
};
