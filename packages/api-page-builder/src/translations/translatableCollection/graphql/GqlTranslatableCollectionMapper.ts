import { TranslatableCollection } from "~/translations/translatableCollection/domain/TranslatableCollection.js";
import { GqlTranslatableCollectionDTO } from "~/translations/translatableCollection/graphql/GqlTranslatableCollectionDTO.js";
import { GqlTranslatableItemMapper } from "~/translations/translatableCollection/graphql/GqlTranslatableItemMapper.js";

export class GqlTranslatableCollectionMapper {
    static toDTO(collection: TranslatableCollection): GqlTranslatableCollectionDTO {
        return {
            id: collection.getId() || collection.getCollectionId(),
            collectionId: collection.getCollectionId(),
            lastModified: collection.getLastModified()?.toISOString(),
            items: collection.getItems().map(item => GqlTranslatableItemMapper.toDTO(item))
        };
    }
}
