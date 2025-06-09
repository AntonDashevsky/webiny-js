import { type IMetaRepository } from "@webiny/app-utils";
import { type ITrashBinItemMapper } from "~/Domain/index.js";
import {
    type ITrashBinBulkActionsGateway,
    type ITrashBinDeleteItemGateway,
    type ITrashBinListGateway,
    type ITrashBinRestoreItemGateway
} from "~/Gateways/index.js";
import { TrashBinItemsRepository } from "./TrashBinItemsRepository.js";

export class TrashBinItemsRepositoryFactory<TEntry extends Record<string, any>> {
    private cache: Map<string, TrashBinItemsRepository<TEntry>> = new Map();

    getRepository(
        metaRepository: IMetaRepository,
        listGateway: ITrashBinListGateway<TEntry>,
        deleteGateway: ITrashBinDeleteItemGateway,
        restoreGateway: ITrashBinRestoreItemGateway<TEntry>,
        bulkActionsGateway: ITrashBinBulkActionsGateway,
        itemMapper: ITrashBinItemMapper<TEntry>
    ) {
        const cacheKey = this.getCacheKey();

        if (!this.cache.has(cacheKey)) {
            this.cache.set(
                cacheKey,
                new TrashBinItemsRepository(
                    metaRepository,
                    listGateway,
                    deleteGateway,
                    restoreGateway,
                    bulkActionsGateway,
                    itemMapper
                )
            );
        }

        return this.cache.get(cacheKey) as TrashBinItemsRepository<TEntry>;
    }

    private getCacheKey() {
        return Date.now().toString();
    }
}

export const trashBinItemsRepositoryFactory = new TrashBinItemsRepositoryFactory();
