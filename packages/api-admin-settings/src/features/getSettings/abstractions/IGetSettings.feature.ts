import type { Settings } from "~/domain/Settings.js";

export interface IGetSettingsFeature {
    execute(name: string): Promise<Settings>;
}
