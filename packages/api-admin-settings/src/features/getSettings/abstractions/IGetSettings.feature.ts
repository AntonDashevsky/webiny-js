import type { Settings } from "~/domain/Settings";

export interface IGetSettingsFeature {
    execute(name: string): Promise<Settings>;
}
