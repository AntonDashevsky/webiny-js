import gql from "graphql-tag";
import type { AcoModel } from "~/types.js";
import { ERROR_FIELD } from "./common.js";

export const createMoveRecord = (model: AcoModel) => {
    const { singularApiName } = model;

    return gql`
            mutation Move${singularApiName}($id: ID!, $folderId: ID!) {
                content: move${singularApiName}(revision: $id, folderId: $folderId) {
                    data
                    ${ERROR_FIELD}
                }
            }
        `;
};
