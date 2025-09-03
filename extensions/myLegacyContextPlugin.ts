import { createContextPlugin } from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return createContextPlugin(async context => {
        console.log("Works!!");
    });
};
