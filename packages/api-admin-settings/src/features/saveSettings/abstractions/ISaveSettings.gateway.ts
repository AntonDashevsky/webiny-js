import type { SettingsGatewayDto } from "~/shared/SettingsGatewayDto";

export interface ISaveSettingsGateway {
    execute(dto: SettingsGatewayDto): Promise<void>;
}
