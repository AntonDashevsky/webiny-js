import { telemetry } from "./Telemetry.js";
import { projectId } from "./ProjectId.js";
import { projectDecorator } from "./ProjectDecorator.js";

// Hooks.
import { adminBeforeBuild } from "./hooks/index.js";
import { adminBeforeDeploy } from "./hooks/index.js";
import { adminAfterBuild } from "./hooks/index.js";
import { adminAfterDeploy } from "./hooks/index.js";
import { apiBeforeBuild } from "./hooks/index.js";
import { apiBeforeDeploy } from "./hooks/index.js";
import { apiAfterBuild } from "./hooks/index.js";
import { apiAfterDeploy } from "./hooks/index.js";
import { coreBeforeBuild } from "./hooks/index.js";
import { coreBeforeDeploy } from "./hooks/index.js";
import { coreAfterBuild } from "./hooks/index.js";
import { coreAfterDeploy } from "./hooks/index.js";
import { websiteBeforeBuild } from "./hooks/index.js";
import { websiteBeforeDeploy } from "./hooks/index.js";
import { websiteAfterBuild } from "./hooks/index.js";
import { websiteAfterDeploy } from "./hooks/index.js";

// Pulumi.
import {
    corePulumi,
    awsTags,
    pulumiResourceNamePrefix,
    productionEnvironments
} from "./pulumi/index.js";

// Exports.
export * from "./defineExtension/index.js";
export * from "./models/index.js";
export * from "./zodPathToAbstraction.js";

// React components (consumed by users). 👇
export const Telemetry = telemetry.ReactComponent;
export const ProjectId = projectId.ReactComponent;
export const ProjectDecorator = projectDecorator.ReactComponent;

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

// Pulumi.
export const CorePulumi = corePulumi.ReactComponent;
export const AwsTags = awsTags.ReactComponent;
export const PulumiResourceNamePrefix = pulumiResourceNamePrefix.ReactComponent;
export const ProductionEnvironments = productionEnvironments.ReactComponent;

// Definitions (used internally). 👇
export const definitions = [
    telemetry.definition,
    projectId.definition,
    projectDecorator.definition,

    // Hooks.
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

    // Pulumi.
    corePulumi.definition,
    awsTags.definition,
    pulumiResourceNamePrefix.definition,
    productionEnvironments.definition
];
