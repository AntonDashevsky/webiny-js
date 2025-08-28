import { extensionDefinitions } from "./builtInExtensions/extensionDefinitions.js";
import { projectDecorator } from "./builtInExtensions/projectDecorator.js";
import { projectId } from "./builtInExtensions/projectId.js";
import { telemetry } from "./builtInExtensions/telemetry.js";

// Hooks.
import {
    adminAfterBuild,
    adminAfterDeploy,
    adminBeforeBuild,
    adminBeforeDeploy,
    apiAfterBuild,
    apiAfterDeploy,
    apiBeforeBuild,
    apiBeforeDeploy,
    coreAfterBuild,
    coreAfterDeploy,
    coreBeforeBuild,
    coreBeforeDeploy,
    websiteAfterBuild,
    websiteAfterDeploy,
    websiteBeforeBuild,
    websiteBeforeDeploy
} from "./builtInExtensions/hooks/index.js";

// Pulumi.
import {
    adminPulumi,
    apiPulumi,
    corePulumi,
    productionEnvironments,
    pulumiResourceNamePrefix,
    websitePulumi
} from "./builtInExtensions/pulumi/index.js";

// Exports.
export * from "./defineExtension/index.js";
export * from "./models/index.js";
export * from "./zodTypes/zodPathToAbstraction.js";
export * from "./zodTypes/zodPathToFile.js";

// React components (consumed by users). 👇
export const Telemetry = telemetry.ReactComponent;
export const ProjectId = projectId.ReactComponent;
export const ProjectDecorator = projectDecorator.ReactComponent;
export const ExtensionDefinitions = extensionDefinitions.ReactComponent;

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
export const AdminPulumi = adminPulumi.ReactComponent;
export const WebsitePulumi = websitePulumi.ReactComponent;
export const ApiPulumi = apiPulumi.ReactComponent;
export const PulumiResourceNamePrefix = pulumiResourceNamePrefix.ReactComponent;
export const ProductionEnvironments = productionEnvironments.ReactComponent;

// Definitions (used internally). 👇
export const definitions = [
    telemetry.definition,
    projectId.definition,
    projectDecorator.definition,
    extensionDefinitions.definition,

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
    pulumiResourceNamePrefix.definition,
    productionEnvironments.definition
];
