export const createBuildApp = config => async options => {
    const { prepareOptions } = await import("../../utils.js");
    const { applyDefaults } = await import("./utils.js");
    const { AppBundler } = await import("./bundlers/AppBundler.js");

    applyDefaults();
    const preparedOptions = prepareOptions({ config, options });
    const bundler = new AppBundler(preparedOptions);

    return bundler.build();
};
