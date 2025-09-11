import type { SettingsGatewayDto } from "~/shared/SettingsGatewayDto.js";

export type GetSettingsParams = {
    name: string;
    tenant: string;
};

export interface IGetSettingsGateway {
    execute(params: GetSettingsParams): Promise<SettingsGatewayDto | undefined>;
}
