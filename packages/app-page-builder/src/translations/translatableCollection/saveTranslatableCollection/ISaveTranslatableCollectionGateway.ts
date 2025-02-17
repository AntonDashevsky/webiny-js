import { TranslatableCollectionInputDto } from "~/translations/translatableCollection/saveTranslatableCollection/TranslatableCollectionInputDto.js";

export interface ISaveTranslatableCollectionGateway {
    execute(translatableCollectionDto: TranslatableCollectionInputDto): Promise<void>;
}
