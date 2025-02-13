import buildPackage from "./buildPackage";
import { prepareOptions } from "../utils";

export default config => async options => {
    const preparedOptions = prepareOptions({ config, options });
    return buildPackage(preparedOptions);
};
