import { defineCloudfrontFunctionResponseHandler, setResponseCookie } from "~/cloudfrontFunctions/index.js";

import { variantRandomKey } from "../utils/common.js";

defineCloudfrontFunctionResponseHandler(event => {
    const request = event.request;
    const response = event.response;

    const variantRandom = request.headers[variantRandomKey]?.value;
    if (variantRandom) {
        setResponseCookie(response, {
            name: variantRandomKey,
            value: variantRandom
        });
    }

    return response;
});
