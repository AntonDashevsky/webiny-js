import { prepareOptions } from "../../utils.js";

export const createBuildFunction = config => async options => {
    const preparedOptions = prepareOptions({ config, options });
    const { FunctionBundler } = await import("./bundlers/FunctionBundler");
    const bundler = new FunctionBundler(preparedOptions);
    return bundler.build();
};
