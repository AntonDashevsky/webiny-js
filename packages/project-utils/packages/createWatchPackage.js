import watchPackage from "./watchPackage";
import { prepareOptions } from "../utils";

export default config => async options => {
    const preparedOptions = prepareOptions({ config, options });
    return watchPackage(preparedOptions);
};
