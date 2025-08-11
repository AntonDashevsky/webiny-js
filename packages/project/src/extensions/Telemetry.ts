import { createExtension } from "./createExtension/createExtension.js";

export interface ITelemetryParams {
    enabled: boolean;
}

export const telemetry = createExtension<ITelemetryParams>({
    type: "Project/Telemetry",
    scopes: ["project"],
    description: "This extension allows you to enable or disable telemetry for the project.",
});
