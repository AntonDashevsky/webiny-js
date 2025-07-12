import type { Settings } from "~/domain/Settings";
import type { ISaveSettingsRepository } from "./abstractions/ISaveSettings.repository";
import type { ISaveSettingsGateway } from "./abstractions/ISaveSettings.gateway";
import type { SettingsGatewayDto } from "~/shared/SettingsGatewayDto";

export type GetTenantId = () => string;

export class SaveSettingsRepository implements ISaveSettingsRepository {
    private gateway: ISaveSettingsGateway;
    private readonly getTenant: GetTenantId;

    constructor(getTenant: GetTenantId, gateway: ISaveSettingsGateway) {
        this.getTenant = getTenant;
        this.gateway = gateway;
    }

    async execute(settings: Settings): Promise<void> {
        const gatewayDto: SettingsGatewayDto = {
            tenant: this.getTenant(),
            name: settings.getName(),
            data: settings.getData()
        };

        await this.gateway.execute(gatewayDto);
    }
}
