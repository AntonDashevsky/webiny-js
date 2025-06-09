import { type PbConfigPluginType, type PbConfigType } from "../../types.js";

export default (config: PbConfigType) =>
    ({
        type: "pb-config",
        config() {
            return config;
        }
    } as PbConfigPluginType);
