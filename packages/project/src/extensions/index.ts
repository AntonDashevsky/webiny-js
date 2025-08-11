export * from "./createExtension";
export * from "./models";

// Hooks.
import { adminAfterBuild } from "./AdminAfterBuild.js";
import { adminAfterDeploy } from "./AdminAfterDeploy.js";
import { adminBeforeBuild } from "./AdminBeforeBuild.js";
import { adminBeforeDeploy } from "./AdminBeforeDeploy.js";
import { apiBeforeBuild } from "./ApiBeforeBuild.js";
import { apiBeforeDeploy } from "./ApiBeforeDeploy.js";
import { apiAfterBuild } from "./ApiAfterBuild.js";
import { apiAfterDeploy } from "./ApiAfterDeploy.js";
import { coreBeforeBuild } from "./CoreBeforeBuild.js";
import { coreBeforeDeploy } from "./CoreBeforeDeploy.js";
import { coreAfterBuild } from "./CoreAfterBuild.js";
import { coreAfterDeploy } from "./CoreAfterDeploy.js";
import { websiteBeforeBuild } from "./WebsiteBeforeBuild.js";
import { websiteBeforeDeploy } from "./WebsiteBeforeDeploy.js";
import { websiteAfterBuild } from "./WebsiteAfterBuild.js";
import { websiteAfterDeploy } from "./WebsiteAfterDeploy.js";

import { telemetry } from "./Telemetry";

// Hooks.
export const AdminBeforeBuild = adminBeforeBuild.ReactComponent;
export const AdminBeforeDeploy = adminBeforeDeploy.ReactComponent;
export const AdminAfterBuild = adminAfterBuild.ReactComponent;
export const AdminAfterDeploy = adminAfterDeploy.ReactComponent;
export const ApiBeforeBuild = apiBeforeBuild.ReactComponent;
export const ApiBeforeDeploy = apiBeforeDeploy.ReactComponent;
export const ApiAfterBuild = apiAfterBuild.ReactComponent;
export const ApiAfterDeploy = apiAfterDeploy.ReactComponent;
export const CoreBeforeBuild = coreBeforeBuild.ReactComponent;
export const CoreBeforeDeploy = coreBeforeDeploy.ReactComponent;
export const CoreAfterBuild = coreAfterBuild.ReactComponent;
export const CoreAfterDeploy = coreAfterDeploy.ReactComponent;
export const WebsiteBeforeBuild = websiteBeforeBuild.ReactComponent;
export const WebsiteBeforeDeploy = websiteBeforeDeploy.ReactComponent;
export const WebsiteAfterBuild = websiteAfterBuild.ReactComponent;
export const WebsiteAfterDeploy = websiteAfterDeploy.ReactComponent;


export const Telemetry = telemetry.ReactComponent;

export const definitions = [
    adminAfterBuild.definition,
    adminAfterDeploy.definition,
    adminBeforeBuild.definition,
    adminBeforeDeploy.definition,
    apiAfterBuild.definition,
    apiAfterDeploy.definition,
    apiBeforeBuild.definition, 
    apiBeforeDeploy.definition,
    coreAfterBuild.definition,
    coreAfterDeploy.definition,
    coreBeforeBuild.definition,
    coreBeforeDeploy.definition,
    websiteAfterBuild.definition,
    websiteAfterDeploy.definition,
    websiteBeforeBuild.definition,
    websiteBeforeDeploy.definition,
    telemetry.definition
];
