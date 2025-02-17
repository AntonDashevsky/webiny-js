/**
 * List everything that needs to be loaded by default.
 */
import filterPlugins from "./filters/index.js";

export default () => {
    return [filterPlugins()];
};
