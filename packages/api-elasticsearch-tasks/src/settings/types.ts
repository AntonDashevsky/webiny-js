import { type IElasticsearchIndexingTaskValuesSettings, type IIndexSettingsValues } from "~/types.js";

export interface IIndexManager {
    settings: IElasticsearchIndexingTaskValuesSettings;

    list(): Promise<string[]>;
    disableIndexing(index: string): Promise<IIndexSettingsValues>;
    enableIndexing(index?: string): Promise<void>;
    createIndex(index: string, settings?: Record<string, any>): Promise<void>;
    indexExists(index: string): Promise<boolean>;
}
