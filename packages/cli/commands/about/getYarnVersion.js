import { SystemRequirements } from "@webiny/system-requirements";

export const getYarnVersion = async () => {
    return SystemRequirements.getYarnVersion();
};
