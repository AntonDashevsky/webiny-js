import {
    LIST_BLOCK_CATEGORIES,
    ListPageBlocksQueryResponse
} from "~/admin/views/PageBlocks/graphql.js";
import { PbBlockCategory } from "~/types.js";
import createBlockCategoryPlugin from "~/admin/utils/createBlockCategoryPlugin.js";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get.js";

export const useBlockCategories = () => {
    const blockCategories = useQuery<ListPageBlocksQueryResponse>(LIST_BLOCK_CATEGORIES, {
        onCompleted(data) {
            const blockCategoriesData: PbBlockCategory[] =
                get(data, "pageBuilder.listBlockCategories.data") || [];
            blockCategoriesData.forEach(element => {
                createBlockCategoryPlugin({
                    ...element
                });
            });
        }
    });

    return blockCategories.loading;
};
