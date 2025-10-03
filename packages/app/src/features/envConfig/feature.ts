import { createFeature } from "~/di/createFeature.js";
import { EnvConfig } from "./abstractions.js";
import { DefaultEnvConfig } from "./EnvConfig.js";

export const EnvConfigFeature = createFeature({
    name: "EnvConfig",
    register(container, params: EnvConfig.Config) {
        container.registerInstance(EnvConfig, new DefaultEnvConfig(params));
    },
    init(container) {
        return container.resolve(EnvConfig);
    }
});
