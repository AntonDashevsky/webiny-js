import { IndexingDisableError } from "~/errors/index.js";
import { type IIndexSettingsValues } from "~/types.js";
import { type IndexSettingsManager } from "./IndexSettingsManager.js";

export class DisableIndexing {
    private readonly settings: IndexSettingsManager;

    public constructor(settings: IndexSettingsManager) {
        this.settings = settings;
    }

    public async exec(index: string): Promise<IIndexSettingsValues> {
        const settings = await this.settings.getSettings(index);

        try {
            await this.settings.setSettings(index, {
                numberOfReplicas: 0,
                refreshInterval: "-1"
            });
        } catch (ex) {
            throw new IndexingDisableError(ex);
        }

        return settings;
    }
}
