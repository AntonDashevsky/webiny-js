import { request } from "graphql-request";
import { localStorage, log } from "@webiny/cli/utils/index.js";
import { getWcpGqlApiUrl } from "@webiny/wcp";

const UPDATE_LAST_ACTIVE_TO_NOW = /* GraphQL */ `
    mutation UpdateLastActiveToNow {
        users {
            updateLastActiveToNow {
                id
                lastActiveOn
            }
        }
    }
`;

export const updateUserLastActiveOn = async () => {
    const pat = localStorage().get("wcpPat");
    if (!pat) {
        throw new Error(
            `It seems you are not logged in. Please login using the ${log.error.hl(
                "webiny login"
            )} command.`
        );
    }

    const headers = { authorization: pat };
    return request(getWcpGqlApiUrl(), UPDATE_LAST_ACTIVE_TO_NOW, {}, headers);
};
