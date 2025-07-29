import gql from "graphql-tag";

import type { PbErrorResponse } from "~/types";
import type { PageResponseData } from "~/admin/graphql/pages";

/**
 * ##############################
 * Publish Page Mutation Response
 */
export interface PublishPageMutationResponse {
    pageBuilder: {
        publishPage: {
            data: PageResponseData | null;
            error: PbErrorResponse | null;
        };
    };
}
export interface PublishPageMutationVariables {
    id: string;
}
export const PUBLISH_PAGE = gql`
    mutation PbPublishPage($id: ID!) {
        pageBuilder {
            publishPage(id: $id) {
                data {
                    id
                    path
                    status
                    locked
                }
                error {
                    code
                    message
                }
            }
        }
    }
`;
