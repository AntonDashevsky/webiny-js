import { FieldPlugin } from "@webiny/db-dynamodb/plugins/definitions/FieldPlugin.js";

export class PageElementDynamoDbElasticFieldPlugin extends FieldPlugin {
    public static override readonly type: string = "pageBuilder.dynamodb.es.field.pageElement";
}
