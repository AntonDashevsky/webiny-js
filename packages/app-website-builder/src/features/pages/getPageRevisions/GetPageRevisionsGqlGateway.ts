import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import type { WbError } from "~/types.js";
import type { IGetPageRevisionsGateway } from "~/features/pages/getPageRevisions/IGetPageRevisionsGateway";
import type { PageRevisionGatewayDto } from "~/features/pages/getPageRevisions/PageRevisionGatewayDto";

export interface GetPageRevisionsResponse {
    websiteBuilder: {
        getPageRevisions:
            | {
                  data: PageRevisionGatewayDto[];
                  error: null;
              }
            | {
                  data: null;
                  error: WbError;
              };
    };
}

export interface GetPageRevisionsQueryVariables {
    pageId: string;
}

export const GET_PAGE_REVISIONS = gql`
    query GetPageRevisions($pageId: ID!) {
        websiteBuilder {
            getPageRevisions(pageId: $pageId) {
                data {
                    id
                    pageId
                    title
                    version
                    status
                    locked
                    savedOn
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

export class GetPageRevisionsGqlGateway implements IGetPageRevisionsGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute(pageId: string) {
        if (!pageId) {
            throw new Error("Page `id` is mandatory");
        }

        const { data: response } = await this.client.query<
            GetPageRevisionsResponse,
            GetPageRevisionsQueryVariables
        >({
            query: GET_PAGE_REVISIONS,
            variables: { pageId },
            fetchPolicy: "network-only"
        });

        if (!response) {
            throw new Error("Network error while fetch page.");
        }

        const { data, error } = response.websiteBuilder.getPageRevisions;

        if (!data) {
            throw new Error(error?.message || `Could not fetch revisions for page: ${pageId}.`);
        }

        return data;
    }
}
