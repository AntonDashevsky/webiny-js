import { defineExtension } from "./defineExtension/defineExtension.js";

export interface ITelemetryParams {
    enabled: boolean;
}

export const telemetry = defineExtension<ITelemetryParams>({
    type: "Project/Telemetry",
    tags: { runtimeContext: "project" },
    description: "This extension allows you to enable or disable telemetry for the project.",
});
