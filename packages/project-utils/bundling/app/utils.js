import { version } from "@webiny/project-utils/package.json";
import { isEnabled } from "@webiny/telemetry/cli";
import { globalConfig } from "@webiny/global-config";
import { isCI } from "ci-info";

export const applyDefaults = () => {
    const telemetry = isEnabled();
    // TODO
    // const config = getProject().config;
    // if (config.cli && "telemetry" in config.cli) {
    //     telemetry = config.cli.telemetry;
    // } else {
    //     telemetry = isEnabled();
    // }

    const wcpProjectId = config.id || process.env.WCP_PROJECT_ID;
    if (wcpProjectId) {
        process.env.REACT_APP_WCP_PROJECT_ID = wcpProjectId;
    }

    if (!("REACT_APP_WEBINY_TELEMETRY" in process.env)) {
        process.env.REACT_APP_WEBINY_TELEMETRY = String(telemetry);
    }

    if (!("REACT_APP_WEBINY_TELEMETRY_USER_ID" in process.env)) {
        process.env.REACT_APP_WEBINY_TELEMETRY_USER_ID = globalConfig.get("id");
    }

    if (!("REACT_APP_WEBINY_TELEMETRY_NEW_USER" in process.env)) {
        const newUser = Boolean(globalConfig.get("newUser")).toString();
        process.env.REACT_APP_WEBINY_TELEMETRY_NEW_USER = newUser;
    }

    if (!("INLINE_RUNTIME_CHUNK" in process.env)) {
        process.env.INLINE_RUNTIME_CHUNK = "true";
    }

    if (!("REACT_APP_IS_CI" in process.env)) {
        process.env.REACT_APP_IS_CI = Boolean(isCI).toString();
    }

    if (!("REACT_APP_WEBINY_VERSION" in process.env)) {
        process.env.REACT_APP_WEBINY_VERSION = process.env.WEBINY_VERSION || version;
    }
};
