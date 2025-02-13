import { watchApp } from "./watchApp.js";
import { prepareOptions } from "../../utils.js";

export const createWatchApp = config => async options => {
    const preparedOptions = prepareOptions({ config, options });
    return watchApp(preparedOptions);
};

export default createWatchApp;
