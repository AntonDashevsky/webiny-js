import type { SettingsGatewayDto } from "~/shared/SettingsGatewayDto.js";

export interface ISaveSettingsGateway {
    execute(dto: SettingsGatewayDto): Promise<void>;
}
