import WebinyError from "@webiny/error";
import {
    type BlockCategory,
    type BlockCategoryStorageOperationsCreateParams,
    type BlockCategoryStorageOperationsDeleteParams,
    type BlockCategoryStorageOperationsGetParams,
    type BlockCategoryStorageOperationsListParams,
    type BlockCategoryStorageOperationsUpdateParams
} from "@webiny/api-page-builder/types.js";
import { type Entity } from "@webiny/db-dynamodb/toolbox.js";
import { queryAll, type QueryAllParams } from "@webiny/db-dynamodb/utils/query.js";
import { sortItems } from "@webiny/db-dynamodb/utils/sort.js";
import { filterItems } from "@webiny/db-dynamodb/utils/filter.js";
import { BlockCategoryDataLoader } from "./dataLoader.js";
import { createListResponse } from "@webiny/db-dynamodb/utils/listResponse.js";
import { BlockCategoryDynamoDbFieldPlugin } from "~/plugins/definitions/BlockCategoryDynamoDbFieldPlugin.js";
import { type PluginsContainer } from "@webiny/plugins";
import { createPartitionKey, createSortKey } from "~/operations/blockCategory/keys.js";
import { type BlockCategoryStorageOperations } from "~/types.js";
import { deleteItem, put } from "@webiny/db-dynamodb";

const createType = (): string => {
    return "pb.blockCategory";
};

export interface CreateBlockCategoryStorageOperationsParams {
    entity: Entity;
    plugins: PluginsContainer;
}
export const createBlockCategoryStorageOperations = ({
    entity,
    plugins
}: CreateBlockCategoryStorageOperationsParams): BlockCategoryStorageOperations => {
    const dataLoader = new BlockCategoryDataLoader({
        entity
    });

    const get = async (params: BlockCategoryStorageOperationsGetParams) => {
        const { where } = params;

        try {
            return await dataLoader.getOne(where);
        } catch (ex) {
            throw new WebinyError(
                ex.message || "Could not load block category by given parameters.",
                ex.code || "BLOCK_CATEGORY_GET_ERROR",
                {
                    where
                }
            );
        }
    };

    const create = async (params: BlockCategoryStorageOperationsCreateParams) => {
        const { blockCategory } = params;

        const keys = {
            PK: createPartitionKey({
                tenant: blockCategory.tenant,
                locale: blockCategory.locale
            }),
            SK: createSortKey(blockCategory)
        };

        try {
            await put({
                entity,
                item: {
                    ...blockCategory,
                    TYPE: createType(),
                    ...keys
                }
            });
            /**
             * Always clear data loader cache when modifying the records.
             */
            dataLoader.clear();

            return blockCategory;
        } catch (ex) {
            throw new WebinyError(
                ex.message || "Could not create block category.",
                ex.code || "BLOCK_CATEGORY_CREATE_ERROR",
                {
                    keys
                }
            );
        }
    };

    const update = async (params: BlockCategoryStorageOperationsUpdateParams) => {
        const { original, blockCategory } = params;
        const keys = {
            PK: createPartitionKey({
                tenant: original.tenant,
                locale: original.locale
            }),
            SK: createSortKey(blockCategory)
        };

        try {
            await put({
                entity,
                item: {
                    ...blockCategory,
                    TYPE: createType(),
                    ...keys
                }
            });
            /**
             * Always clear data loader cache when modifying the records.
             */
            dataLoader.clear();

            return blockCategory;
        } catch (ex) {
            throw new WebinyError(
                ex.message || "Could not update block category.",
                ex.code || "BLOCK_CATEGORY_UPDATE_ERROR",
                {
                    keys,
                    original,
                    blockCategory
                }
            );
        }
    };

    const deleteBlockCategory = async (params: BlockCategoryStorageOperationsDeleteParams) => {
        const { blockCategory } = params;
        const keys = {
            PK: createPartitionKey({
                tenant: blockCategory.tenant,
                locale: blockCategory.locale
            }),
            SK: createSortKey(blockCategory)
        };

        try {
            await deleteItem({
                entity,
                keys
            });
            /**
             * Always clear data loader cache when modifying the records.
             */
            dataLoader.clear();

            return blockCategory;
        } catch (ex) {
            throw new WebinyError(
                ex.message || "Could not delete block category.",
                ex.code || "BLOCK_CATEGORY_DELETE_ERROR",
                {
                    keys,
                    blockCategory
                }
            );
        }
    };

    const list = async (params: BlockCategoryStorageOperationsListParams) => {
        const { where, sort, limit } = params;

        const { tenant, locale, ...restWhere } = where;
        const queryAllParams: QueryAllParams = {
            entity,
            partitionKey: createPartitionKey({ tenant, locale }),
            options: {
                gt: " "
            }
        };

        let items: BlockCategory[] = [];

        try {
            items = await queryAll<BlockCategory>(queryAllParams);
        } catch (ex) {
            throw new WebinyError(
                ex.message || "Could not list block categories by given parameters.",
                ex.code || "BLOCK_CATEGORIES_LIST_ERROR",
                {
                    partitionKey: queryAllParams.partitionKey,
                    options: queryAllParams.options
                }
            );
        }

        const fields = plugins.byType<BlockCategoryDynamoDbFieldPlugin>(
            BlockCategoryDynamoDbFieldPlugin.type
        );

        const filteredItems = filterItems<BlockCategory>({
            plugins,
            where: restWhere,
            items,
            fields
        });

        const sortedItems = sortItems<BlockCategory>({
            items: filteredItems,
            sort,
            fields
        });

        return createListResponse({
            items: sortedItems,
            limit: limit || 100000,
            totalCount: filteredItems.length,
            after: null
        });
    };

    return {
        dataLoader,
        get,
        create,
        update,
        delete: deleteBlockCategory,
        list
    };
};
