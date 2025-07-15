import { Settings } from "~/domain/Settings";
import type { IGetSettingsGateway } from "~/features/getSettings/abstractions/IGetSettings.gateway";
import type { IGetSettingsRepository } from "~/features/getSettings/abstractions/IGetSettings.repository";

export type GetTenantId = () => string;

export class GetSettingsRepository implements IGetSettingsRepository {
    private gateway: IGetSettingsGateway;
    private readonly getTenant: GetTenantId;

    constructor(getTenant: GetTenantId, gateway: IGetSettingsGateway) {
        this.getTenant = getTenant;
        this.gateway = gateway;
    }

    async execute(name: string): Promise<Settings> {
        const settingsDto = await this.gateway.execute({ tenant: this.getTenant(), name });

        return new Settings(name, settingsDto?.data ?? {});
    }
}
