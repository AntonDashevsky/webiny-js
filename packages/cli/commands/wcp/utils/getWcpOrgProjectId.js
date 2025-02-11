import { getWcpProjectId } from "./getWcpProjectId.js";

export const getWcpOrgProjectId = context => {
    const id = getWcpProjectId(context);
    if (typeof id === "string") {
        return id.split("/");
    }
    return [];
};
