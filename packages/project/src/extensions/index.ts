import { extensionDefinitions } from "./extensionDefinitions.js";
import { projectDecorator } from "./projectDecorator.js";
import { projectId } from "./projectId.js";
import { telemetry } from "./telemetry.js";

// Hooks.
import {
    adminAfterBuild,
    adminAfterDeploy,
    adminAfterWatch,
    adminBeforeBuild,
    adminBeforeDeploy,
    adminBeforeWatch,
    afterBuild,
    apiAfterBuild,
    apiAfterDeploy,
    apiAfterWatch,
    apiBeforeBuild,
    apiBeforeDeploy,
    apiBeforeWatch,
    beforeBuild,
    coreAfterBuild,
    coreAfterDeploy,
    coreAfterWatch,
    coreBeforeBuild,
    coreBeforeDeploy,
    coreBeforeWatch
} from "./hooks/index.js";

// Pulumi.
import {
    adminPulumi,
    apiPulumi,
    corePulumi,
    productionEnvironments,
    pulumiResourceNamePrefix
} from "./pulumi/index.js";

// Exports.
export const Telemetry = telemetry.ReactComponent;
export const ProjectId = projectId.ReactComponent;
export const ProjectDecorator = projectDecorator.ReactComponent;
export const ExtensionDefinitions = extensionDefinitions.ReactComponent;

// Hooks.
export const BeforeBuild = beforeBuild.ReactComponent;
export const AfterBuild = afterBuild.ReactComponent;
export const AdminBeforeBuild = adminBeforeBuild.ReactComponent;
export const AdminBeforeDeploy = adminBeforeDeploy.ReactComponent;
export const AdminBeforeWatch = adminBeforeWatch.ReactComponent;
export const AdminAfterBuild = adminAfterBuild.ReactComponent;
export const AdminAfterDeploy = adminAfterDeploy.ReactComponent;
export const AdminAfterWatch = adminAfterWatch.ReactComponent;
export const ApiBeforeBuild = apiBeforeBuild.ReactComponent;
export const ApiBeforeDeploy = apiBeforeDeploy.ReactComponent;
export const ApiBeforeWatch = apiBeforeWatch.ReactComponent;
export const ApiAfterBuild = apiAfterBuild.ReactComponent;
export const ApiAfterDeploy = apiAfterDeploy.ReactComponent;
export const ApiAfterWatch = apiAfterWatch.ReactComponent;
export const CoreBeforeBuild = coreBeforeBuild.ReactComponent;
export const CoreBeforeDeploy = coreBeforeDeploy.ReactComponent;
export const CoreBeforeWatch = coreBeforeWatch.ReactComponent;
export const CoreAfterBuild = coreAfterBuild.ReactComponent;
export const CoreAfterDeploy = coreAfterDeploy.ReactComponent;
export const CoreAfterWatch = coreAfterWatch.ReactComponent;

// Pulumi.
export const CorePulumi = corePulumi.ReactComponent;
export const AdminPulumi = adminPulumi.ReactComponent;
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
    adminAfterWatch.definition,
    beforeBuild.definition,
    afterBuild.definition,
    adminBeforeBuild.definition,
    adminBeforeDeploy.definition,
    adminBeforeWatch.definition,
    apiAfterBuild.definition,
    apiAfterDeploy.definition,
    apiAfterWatch.definition,
    apiBeforeBuild.definition,
    apiBeforeDeploy.definition,
    apiBeforeWatch.definition,
    coreAfterBuild.definition,
    coreAfterDeploy.definition,
    coreAfterWatch.definition,
    coreBeforeBuild.definition,
    coreBeforeDeploy.definition,
    coreBeforeWatch.definition,

    // Pulumi.
    corePulumi.definition,
    pulumiResourceNamePrefix.definition,
    productionEnvironments.definition
];

export { Project } from "./Project.js";

export * from "../defineExtension/index.js";
