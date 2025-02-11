import { SystemRequirements } from "@webiny/system-requirements";

export const getNpmVersion = async () => {
    return SystemRequirements.getNpmVersion();
};
