import * as GQL from "~/admin/viewsGraphql.js";
import { type ListCmsModelsQueryResponse, type ListCmsModelsQueryVariables } from "~/admin/viewsGraphql.js";
import { useQuery } from "~/admin/hooks/index.js";
import { useMemo } from "react";
import { type CmsModel } from "~/types.js";

/**
 * @deprecated Use `useModels` hook instead.
 */
export const useContentModels = () => {
    const {
        data,
        loading,
        error: apolloError,
        refetch
    } = useQuery<ListCmsModelsQueryResponse, ListCmsModelsQueryVariables>(GQL.LIST_CONTENT_MODELS, {
        variables: {
            includeBeingDeleted: true,
            includePlugins: true
        }
    });

    const models = useMemo<CmsModel[]>(() => {
        return data?.listContentModels?.data || [];
    }, [data]);

    const error = useMemo(() => {
        if (!!apolloError) {
            return apolloError.message;
        }
        return data?.listContentModels?.error?.message || null;
    }, [apolloError]);

    return {
        models,
        loading,
        error,
        refresh: refetch
    };
};

export const useModels = () => {
    return useContentModels();
};
