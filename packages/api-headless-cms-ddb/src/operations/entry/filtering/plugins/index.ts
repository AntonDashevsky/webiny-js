import { createDefaultFilterCreate } from "./defaultFilterCreate.js";
import { createRefFilterCreate } from "./refFilterCreate.js";
import { objectFilterCreate } from "./objectFilterCreate.js";

export const createFilterCreatePlugins = () => {
    return [createDefaultFilterCreate(), createRefFilterCreate(), objectFilterCreate()];
};
