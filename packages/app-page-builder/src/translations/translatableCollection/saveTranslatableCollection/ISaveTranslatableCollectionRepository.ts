import { TranslatableCollection } from "~/translations/translatableCollection/TranslatableCollection.js";

export interface ISaveTranslatableCollectionRepository {
    execute(translatableCollection: TranslatableCollection): Promise<void>;
}
