import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { getClean } from "@webiny/db-dynamodb";
import { WebinyError } from "@webiny/error";
import type { GenericRecord } from "@webiny/api/types";
import { SettingsDynamoTable } from "./SettingsDynamoTable";
import type {
    GetSettingsParams,
    IGetSettingsGateway
} from "~/features/getSettings/abstractions/IGetSettings.gateway";
import type { SettingsGatewayDto } from "~/shared/SettingsGatewayDto";

export class GetSettingsGateway implements IGetSettingsGateway {
    private table: SettingsDynamoTable;

    constructor(dynamoDbClient: DynamoDBDocument) {
        this.table = new SettingsDynamoTable(dynamoDbClient);
    }

    async execute(params: GetSettingsParams): Promise<SettingsGatewayDto | undefined> {
        try {
            const entry = await getClean<{ data: GenericRecord<string> }>({
                entity: this.table.getEntity(),
                keys: this.table.createKeys(params)
            });

            if (!entry) {
                return undefined;
            }

            return {
                name: params.name,
                tenant: params.tenant,
                data: entry.data
            };
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not get settings.",
                code: "GET_SETTINGS_ERROR",
                data: params
            });
        }
    }
}
