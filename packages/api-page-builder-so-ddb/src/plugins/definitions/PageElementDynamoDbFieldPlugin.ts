import { FieldPlugin } from "@webiny/db-dynamodb/plugins/definitions/FieldPlugin.js";

export class PageElementDynamoDbFieldPlugin extends FieldPlugin {
    public static override readonly type: string = "pageBuilder.dynamodb.field.pageElement";
}
