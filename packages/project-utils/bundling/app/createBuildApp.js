import { buildApp } from "./buildApp.js";
import { prepareOptions } from "../../utils.js";

export const createBuildApp = config => async options => {
    const preparedOptions = prepareOptions({ config, options });
    return buildApp(preparedOptions);
};

export default createBuildApp;
