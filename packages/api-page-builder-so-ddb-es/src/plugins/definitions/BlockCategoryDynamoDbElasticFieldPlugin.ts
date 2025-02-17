import { FieldPlugin } from "@webiny/db-dynamodb/plugins/definitions/FieldPlugin.js";

export class BlockCategoryDynamoDbElasticFieldPlugin extends FieldPlugin {
    public static override readonly type: string = "pageBuilder.dynamodb.es.field.blockCategory";
}
