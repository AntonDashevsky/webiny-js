import type { Settings } from "~/domain/Settings";

export interface ISaveSettingsRepository {
    execute(settings: Settings): Promise<void>;
}
