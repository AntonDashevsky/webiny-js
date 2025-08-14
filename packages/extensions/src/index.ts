import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
    Telemetry,

    // Hooks.
    AdminAfterBuild,
    AdminAfterDeploy,
    AdminBeforeBuild,
    AdminBeforeDeploy,
    ApiAfterBuild,
    ApiAfterDeploy,
    ApiBeforeBuild,
    ApiBeforeDeploy,
    CoreAfterBuild,
    CoreAfterDeploy,
    CoreBeforeBuild,
    CoreBeforeDeploy,
    WebsiteAfterBuild,
    WebsiteAfterDeploy,
    WebsiteBeforeBuild,
    WebsiteBeforeDeploy,

    // Pulumi.
    CorePulumi,
    AwsTags,
    PulumiResourceNamePrefix,
    ProductionEnvironments
} from "@webiny/project/extensions/index.js";

export const Project = {
    Telemetry,
    AwsTags,
    PulumiResourceNamePrefix,
    ProductionEnvironments
};

export const Cli = {
    Command: CliCommand
};

export const Admin = {
    BeforeBuild: AdminBeforeBuild,
    BeforeDeploy: AdminBeforeDeploy,
    AfterBuild: AdminAfterBuild,
    AfterDeploy: AdminAfterDeploy
};

export const Api = {
    BeforeBuild: ApiBeforeBuild,
    BeforeDeploy: ApiBeforeDeploy,
    AfterBuild: ApiAfterBuild,
    AfterDeploy: ApiAfterDeploy
};

export const Core = {
    BeforeBuild: CoreBeforeBuild,
    BeforeDeploy: CoreBeforeDeploy,
    AfterBuild: CoreAfterBuild,
    AfterDeploy: CoreAfterDeploy,
    Pulumi: CorePulumi
};

export const Website = {
    BeforeBuild: WebsiteBeforeBuild,
    BeforeDeploy: WebsiteBeforeDeploy,
    AfterBuild: WebsiteAfterBuild,
    AfterDeploy: WebsiteAfterDeploy
};
