import { useApolloClient } from "@apollo/react-hooks";
import { DUPLICATE_PAGE } from "~/admin/graphql/pages";
import type { DuplicatePageResponse, DuplicatePageVariables, PageItem } from "./types";
import { PbPageData } from "~/types";

interface DuplicatePageMutationParams {
    page: PageItem;
}

export const useDuplicatePageCase = () => {
    const client = useApolloClient();

    const duplicatePage = async (params: DuplicatePageMutationParams) => {
        const page = params.page;
        let location: PbPageData["wbyAco_location"] = { folderId: "root" };

        if ("wbyAco_location" in page) {
            location = page.wbyAco_location;
        } else if ("location" in page) {
            location = page.location;
        }

        const { data: response } = await client.mutate<
            DuplicatePageResponse,
            DuplicatePageVariables
        >({
            mutation: DUPLICATE_PAGE,
            variables: {
                id: page.id,
                meta: { location }
            }
        });

        if (!response) {
            throw new Error(`Network error while duplicating page "${params.page.id}".`);
        }

        const { data, error } = response.pageBuilder.duplicatePage;

        if (!data) {
            throw new Error(error?.message || `Could not duplicate page "${params.page.id}".`);
        }

        return data;
    };

    return {
        duplicatePage
    };
};
