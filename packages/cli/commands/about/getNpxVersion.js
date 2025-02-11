import { SystemRequirements } from "@webiny/system-requirements";

export const getNpxVersion = async () => {
    return SystemRequirements.getNpxVersion();
};
