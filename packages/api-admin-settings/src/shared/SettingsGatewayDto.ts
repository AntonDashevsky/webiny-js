import type { GenericRecord } from "@webiny/api/types.js";

export type SettingsGatewayDto = {
    tenant: string;
    name: string;
    data: GenericRecord<string>;
};
