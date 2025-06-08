import { applyDefaults } from "../../utils.js";

export const createRspackConfig = async (paths, options) => {
    applyDefaults();

    const configFactory = await import("./config/rspack.config.js");

    // Generate configuration
    let config = configFactory(options.env, { paths, options });

    if (typeof options.overrides.rspack === "function") {
        config = options.overrides.rspack(config);
    }

    return config;
};
