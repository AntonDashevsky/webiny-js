import type { Settings } from "~/domain/Settings.js";

export interface IGetSettingsRepository {
    execute(name: string): Promise<Settings>;
}
