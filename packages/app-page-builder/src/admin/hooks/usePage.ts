import { useQuery } from "@apollo/react-hooks";
import {
    GET_PAGE,
    GetPageQueryResponse,
    GetPageQueryVariables,
    PageResponseData
} from "~/admin/graphql/pages.js";
import { PbErrorResponse } from "~/types.js";

export type Page = PageResponseData & { settings: Record<string, any> };

export const usePage = (
    pageId: string
): { loading: boolean; page: Page | undefined; error: PbErrorResponse | undefined } => {
    const query = useQuery<GetPageQueryResponse, GetPageQueryVariables>(GET_PAGE, {
        variables: { id: String(pageId) },
        skip: !pageId
    });

    const { data, error } = query.data?.pageBuilder.getPage ?? { data: null, error: null };

    return { loading: query.loading, page: (data as Page) || undefined, error: error || undefined };
};
