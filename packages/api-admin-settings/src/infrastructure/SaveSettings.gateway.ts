import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { put } from "@webiny/db-dynamodb";
import { WebinyError } from "@webiny/error";
import { SettingsDynamoTable } from "./SettingsDynamoTable";
import type { ISaveSettingsGateway } from "~/features/saveSettings/abstractions/ISaveSettings.gateway";
import type { SettingsGatewayDto } from "~/shared/SettingsGatewayDto";

export class SaveSettingsGateway implements ISaveSettingsGateway {
    private table: SettingsDynamoTable;

    constructor(dynamoDbClient: DynamoDBDocument) {
        this.table = new SettingsDynamoTable(dynamoDbClient);
    }

    async execute({ name, tenant, data }: SettingsGatewayDto): Promise<void> {
        try {
            const keys = {
                ...this.table.createKeys({ name, tenant }),
                ...this.table.createGsiKeys({ name, tenant })
            };

            await put({
                entity: this.table.getEntity(),
                item: {
                    ...keys,
                    data
                }
            });
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not update settings.",
                code: "UPDATE_SETTINGS_ERROR",
                data: { name, tenant, data }
            });
        }
    }
}
