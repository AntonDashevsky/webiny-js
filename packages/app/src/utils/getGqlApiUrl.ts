import { getApiUrl } from "./getApiUrl.js";

export const getGqlApiUrl = (): string => {
    return getApiUrl("/graphql");
};
