import { TranslatableItem } from "~/translations/translatableCollection/domain/TranslatableItem.js";
import { GqlTranslatableItemDTO } from "~/translations/translatableCollection/graphql/GqlTranslatableItemDTO.js";

export class GqlTranslatableItemMapper {
    static toDTO(item: TranslatableItem): GqlTranslatableItemDTO {
        return {
            itemId: item.itemId,
            value: item.value,
            context: item.context,
            modifiedOn: item.modifiedOn.toISOString(),
            modifiedBy: item.modifiedBy
        };
    }
}
