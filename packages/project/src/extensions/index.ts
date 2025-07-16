export * from "./createExtension";
export * from "./models";

import { apiBeforeBuild } from "./ApiBeforeBuild.js";
import { apiBeforeDeploy } from "./ApiBeforeDeploy.js";
import { apiAfterBuild } from "./ApiAfterBuild.js";
import { apiAfterDeploy } from "./ApiAfterDeploy.js";
import { telemetry } from "./Telemetry";

export const ApiBeforeBuild = apiBeforeBuild.ReactComponent;
export const ApiBeforeDeploy = apiBeforeDeploy.ReactComponent;
export const ApiAfterBuild = apiAfterBuild.ReactComponent;
export const ApiAfterDeploy = apiAfterDeploy.ReactComponent;
export const Telemetry = telemetry.ReactComponent;

export const definitions = [
    apiAfterBuild.definition,
    apiAfterDeploy.definition,
    apiBeforeBuild.definition, 
    apiBeforeDeploy.definition,
    telemetry.definition
];
