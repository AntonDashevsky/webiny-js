import { createGetEnv } from "~/pulumi/env/base.js";

export const getEnvVariableWebinyEnv = createGetEnv({
    name: "WEBINY_ENV"
});
