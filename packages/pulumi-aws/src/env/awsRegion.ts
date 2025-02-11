import { createGetEnv } from "~/env/base.js";

export const getEnvVariableAwsRegion = createGetEnv({
    name: "AWS_REGION"
});
