import { applyDefaults } from "./utils.js";
import createWatchConfig from "./createWatchConfig.js";

export const watchApp = options => {
    applyDefaults();

    if (!("REACT_APP_DEBUG" in process.env)) {
        process.env.REACT_APP_DEBUG = "true";
    }

    process.env.NODE_ENV = "development";
    process.env.ESLINT_NO_UNUSED_VARS = "0";

    return createWatchConfig(options);
};

export default watchApp;
