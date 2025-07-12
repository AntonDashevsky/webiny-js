import { GenericRecord } from "@webiny/api/types";
import { Settings } from "~/domain/Settings";

export type SettingsDto = {
    name: string;
    settings: GenericRecord<string>;
};

export interface ISaveSettingsFeature {
    execute(settings: SettingsDto): Promise<Settings>;
}
