import { applyDefaults } from "../../utils.js";

export const createRspackConfig = async (paths, options) => {
    applyDefaults();

    const { createRspackConfig } = await import("./config/rspack.config.js");

    // Generate configuration
    let config = createRspackConfig(options.env, { paths, options });

    if (typeof options.overrides.rspack === "function") {
        config = options.overrides.rspack(config);
    }

    return config;
};
