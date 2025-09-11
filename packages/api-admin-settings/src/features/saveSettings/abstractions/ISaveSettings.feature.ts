import type { GenericRecord } from "@webiny/api/types.js";
import type { Settings } from "~/domain/Settings.js";

export type SettingsDto = {
    name: string;
    settings: GenericRecord<string>;
};

export interface ISaveSettingsFeature {
    execute(settings: SettingsDto): Promise<Settings>;
}
