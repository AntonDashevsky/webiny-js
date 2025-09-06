import { prepareOptions } from "../../utils.js";

export const createWatchFunction = config => async options => {
    const preparedOptions = prepareOptions({ config, options });
    const { FunctionBundler } = await import("./bundlers/FunctionBundler.js");
    const bundler = new FunctionBundler(preparedOptions);
    return bundler.watch();
};
