import type { TranslatableItem } from "~/translations/translatableCollection/domain/TranslatableItem";
import type { GqlTranslatableItemDTO } from "~/translations/translatableCollection/graphql/GqlTranslatableItemDTO";

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
