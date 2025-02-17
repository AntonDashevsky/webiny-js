import gql from "graphql-tag";
import { AcoAppMode, AcoModel } from "~/types.js";
import { ERROR_FIELD, LIST_META_FIELD } from "./common.js";

export const createListTags = (model: AcoModel, mode: AcoAppMode) => {
    if (mode === "cms") {
        return null;
    }
    const { pluralApiName } = model;
    return gql`
        query List${pluralApiName}Tags($where: AcoSearchRecordTagListWhereInput) {
            search {
                content: list${pluralApiName}Tags(where: $where) {
                    data {
                        tag
                    }
                    ${LIST_META_FIELD}
                    ${ERROR_FIELD}
                }
            }
        }
    `;
};
