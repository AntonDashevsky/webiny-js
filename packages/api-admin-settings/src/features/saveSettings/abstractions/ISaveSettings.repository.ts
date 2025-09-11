import type { Settings } from "~/domain/Settings.js";

export interface ISaveSettingsRepository {
    execute(settings: Settings): Promise<void>;
}
