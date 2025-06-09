import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get.js";

import { LIST_BLOCK_CATEGORIES } from "~/admin/views/BlockCategories/graphql.js";
import { type PbBlockCategory } from "~/types.js";

export function useBlockCategories() {
    const { data } = useQuery(LIST_BLOCK_CATEGORIES);
    const blockCategoriesData: PbBlockCategory[] =
        get(data, "pageBuilder.listBlockCategories.data") || [];

    return blockCategoriesData;
}
