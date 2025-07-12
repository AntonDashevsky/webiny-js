import type { Settings } from "~/domain/Settings";

export interface IGetSettingsRepository {
    execute(name: string): Promise<Settings>;
}
