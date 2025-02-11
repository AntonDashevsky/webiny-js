import { localStorage } from "@webiny/cli/utils/index.js";

export const setWcpPat = wcpPat => {
    localStorage().set("wcpPat", wcpPat);
};
