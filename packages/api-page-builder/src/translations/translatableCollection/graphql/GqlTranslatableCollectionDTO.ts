import { GqlTranslatableItemDTO } from "~/translations/translatableCollection/graphql/GqlTranslatableItemDTO.js";

export interface GqlTranslatableCollectionDTO {
    id: string;
    collectionId: string;
    lastModified?: string;
    items: GqlTranslatableItemDTO[];
}
