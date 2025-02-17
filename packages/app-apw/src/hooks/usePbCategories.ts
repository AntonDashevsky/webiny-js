import { useQuery } from "@apollo/react-hooks";
import dotPropImmutable from "dot-prop-immutable";
import { LIST_CATEGORIES } from "~/graphql/workflow.gql.js";
import { PbCategory } from "~/types.js";

interface UsePbCategoriesResult {
    categories: PbCategory[];
    loading: boolean;
}

export const usePbCategories = (): UsePbCategoriesResult => {
    const { data, loading } = useQuery(LIST_CATEGORIES);

    return {
        categories: dotPropImmutable.get(data, "pageBuilder.listCategories.data", []),
        loading
    };
};
