import type { GenericRecord } from "@webiny/app/types";

export type SettingsCache<T = GenericRecord<string>> = Map<string, T>;

export const settingsCache = new Map<string, GenericRecord<string>>();
