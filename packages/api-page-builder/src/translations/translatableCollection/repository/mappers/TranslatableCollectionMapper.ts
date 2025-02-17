import { TranslatableCollection } from "~/translations/translatableCollection/domain/TranslatableCollection.js";
import { TranslatableItemMapper } from "~/translations/translatableCollection/repository/mappers/TranslatableItemMapper.js";
import { TranslatableCollectionDTO } from "~/translations/translatableCollection/repository/mappers/TranslatableCollectionDTO.js";

export class TranslatableCollectionMapper {
    static fromDTO(dto: TranslatableCollectionDTO, id?: string): TranslatableCollection {
        return new TranslatableCollection(
            {
                collectionId: dto.collectionId,
                items: dto.items.map(item => TranslatableItemMapper.fromDTO(item))
            },
            id
        );
    }

    static toDTO(collection: TranslatableCollection) {
        return {
            id: collection.getId(),
            collectionId: collection.getCollectionId(),
            items: collection.getItems().map(item => TranslatableItemMapper.toDTO(item))
        };
    }
}
