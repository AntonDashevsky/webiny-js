import type { GenericRecord } from "@webiny/api/types";

export type SettingsGatewayDto = {
    tenant: string;
    name: string;
    data: GenericRecord<string>;
};
