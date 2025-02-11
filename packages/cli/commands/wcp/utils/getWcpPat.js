import { localStorage } from "@webiny/cli/utils/index.js";

export const getWcpPat = wcpPat => {
    return localStorage().get("wcpPat", wcpPat);
};
