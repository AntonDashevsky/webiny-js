import { useEffect } from "react";
import get from "lodash/get.js";
import { useAdminPageBuilder } from "~/admin/hooks/useAdminPageBuilder.js";
import { DELETE_PAGE } from "~/admin/graphql/pages.js";
import { DeletePageOptions } from "~/admin/contexts/AdminPageBuilder.js";
import { PbPageData } from "~/types.js";

export const DefaultOnPageDelete = () => {
    const { onPageDelete } = useAdminPageBuilder();

    const handleDeletePage = async (
        revision: Pick<PbPageData, "id" | "version">,
        options: DeletePageOptions
    ) => {
        /**
         * Error is due to options.mutationOptions
         */
        // @ts-expect-error
        const response = await options.client.mutate({
            mutation: DELETE_PAGE,
            variables: { id: revision.id },
            ...get(options, "mutationOptions", {})
        });

        const { error, data } = get(response, "data.pageBuilder.deletePage");

        return {
            error,
            data
        };
    };

    useEffect(() => {
        return onPageDelete(next => async params => {
            const result = await next(params);

            const { error } = await handleDeletePage(result.page, result.options);

            return { ...result, error };
        });
    }, []);

    return null;
};
