import chunk from "lodash/chunk";
import type { Table } from "@webiny/db-dynamodb/toolbox";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb";
import { BatchWriteCommand } from "@webiny/aws-sdk/client-dynamodb/index.js";

export const insertDynamoDbTestData = async (
    table: Table<string, string, string>,
    data: Record<string, any>[]
) => {
    const client = getDocumentClient({}, true);
    const chunkedItems: any[][] = chunk(data, 25);
    for (const items of chunkedItems) {
        const batch = items.map(item => {
            return {
                PutRequest: {
                    Item: item
                }
            };
        });
        await client.send(
            new BatchWriteCommand({
                RequestItems: {
                    [table.name]: batch
                }
            })
        );
    }
};
