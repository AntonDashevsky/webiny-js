import { FieldPlugin } from "@webiny/db-dynamodb/plugins/definitions/FieldPlugin.js";

export class FormDynamoDbFieldPlugin extends FieldPlugin {
    public static override readonly type: string = "formBuilder.dynamodb.field.form";
}
