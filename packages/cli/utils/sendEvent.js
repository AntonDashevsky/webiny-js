import { sendEvent as telemetrySendEvent } from "@webiny/telemetry/cli.js";
import getProject from "./getProject.js";

export const sendEvent = (event, properties) => {
    const project = getProject();
    if (project.config.cli && project.config.cli.telemetry === false) {
        return;
    }

    return telemetrySendEvent({ event, properties });
};
