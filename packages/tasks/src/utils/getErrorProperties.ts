import { IResponseError } from "~/response/abstractions/index.js";
import { getObjectProperties } from "~/utils/getObjectProperties.js";

export const getErrorProperties = (error: Error | IResponseError): IResponseError => {
    const value = getObjectProperties<IResponseError>(error);

    delete value.stack;

    return value;
};
