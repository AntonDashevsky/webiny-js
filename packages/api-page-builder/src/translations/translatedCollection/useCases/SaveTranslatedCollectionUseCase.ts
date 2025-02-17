import { PbContext } from "~/graphql/types.js";
import { Identifier } from "~/translations/Identifier.js";
import { TranslatedCollection } from "~/translations/translatedCollection/domain/TranslatedCollection.js";
import { GetOrCreateTranslatedCollectionUseCase } from "~/translations/translatedCollection/useCases/GetOrCreateTranslatedCollectionUseCase.js";
import { UpdateTranslatedCollectionRepository } from "~/translations/translatedCollection/repository/UpdateTranslatedCollectionRepository.js";
import { CreateTranslatedCollectionRepository } from "~/translations/translatedCollection/repository/CreateTranslatedCollectionRepository.js";
import { TranslatedItem } from "~/translations/translatedCollection/domain/TranslatedItem.js";

interface SaveTranslatedCollectionParams {
    collectionId: string;
    languageCode: string;
    items: Array<{
        itemId: string;
        translatedOn?: string;
        value?: string;
    }>;
}

export class SaveTranslatedCollectionUseCase {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(params: SaveTranslatedCollectionParams): Promise<TranslatedCollection> {
        const getOrCreate = new GetOrCreateTranslatedCollectionUseCase(this.context);
        const collection = await getOrCreate.execute({
            collectionId: params.collectionId,
            languageCode: params.languageCode
        });

        const identity = this.getIdentity();

        const newItems = params.items.map(item => {
            // If a value was unset, we want to unset the translatedOn and translatedBy.
            const value = item.value ? item.value : undefined;

            const translatedOn = item.translatedOn ? new Date(item.translatedOn) : undefined;

            return TranslatedItem.create({
                itemId: item.itemId,
                value,
                translatedOn: translatedOn ?? value ? new Date() : undefined,
                translatedBy: value ? identity : undefined
            });
        });

        collection.updateItems(newItems);

        if (collection.getId()) {
            const update = new UpdateTranslatedCollectionRepository(this.context);
            await update.execute(collection);
        } else {
            collection.setId(Identifier.generate());
            const create = new CreateTranslatedCollectionRepository(this.context);
            await create.execute(collection);
        }

        return collection;
    }

    private getIdentity() {
        const identity = this.context.security.getIdentity();

        return {
            id: identity.id,
            type: identity.type,
            displayName: identity.displayName || ""
        };
    }
}
