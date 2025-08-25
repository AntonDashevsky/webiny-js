import { createReactAppConfig, type ReactAppConfigModifier } from "~/createReactAppConfig.js";
import { type ApiOutput } from "@webiny/pulumi-aws";

export const createWebsiteAppConfig = (modifier?: ReactAppConfigModifier) => {
    return createReactAppConfig(baseParams => {
        const { config, options } = baseParams;

        config.customEnv(env => ({
            ...env,
            PORT: process.env.PORT || 3000,
            WEBINY_WEBSITE_ENV: options.env
        }));

        config.pulumiOutputToEnv<ApiOutput>("api", ({ output, env }) => {
            if (!output) {
                return env;
            }

            return {
                ...env,
                REACT_APP_GRAPHQL_API_URL: `${output.apiUrl}/graphql`,
                REACT_APP_API_URL: output.apiUrl
            };
        });

        if (modifier) {
            modifier(baseParams);
        }
    });
};
