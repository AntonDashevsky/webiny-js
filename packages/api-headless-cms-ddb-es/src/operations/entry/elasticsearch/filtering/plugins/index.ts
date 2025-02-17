import { createDefaultFilterPlugin } from "./defaultFilterPlugin.js";
import { createObjectFilterPlugin } from "./objectFilterPlugin.js";
import { createRefFilterPlugin } from "./refFilterPlugin.js";

export const createFilterPlugins = () => {
    return [createDefaultFilterPlugin(), createObjectFilterPlugin(), createRefFilterPlugin()];
};
