import { type Table as DynamoDbTable } from "@webiny/db-dynamodb/toolbox.js";

export type ITable = DynamoDbTable<string, "PK", "SK">;
