import { createGetEnvOptional } from "~/env/base.js";

export const getEnvVariableWebinyVariant = createGetEnvOptional<string>({
    name: "WEBINY_ENV_VARIANT",
    defaultValue: ""
});
