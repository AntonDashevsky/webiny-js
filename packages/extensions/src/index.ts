import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
    Telemetry,
    ProjectId,
    ProjectDecorator,

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

// Cms.
import { OnEntryBeforeCreate } from "@webiny/api-headless-cms/extensions/index.js";

// Exports.
export { Webiny } from "@webiny/serverless-cms-aws/Webiny.js";

export const Project = {
    Id: ProjectId,
    Telemetry,
    AwsTags,
    PulumiResourceNamePrefix,
    ProductionEnvironments,
    Decorator: ProjectDecorator
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
    AfterDeploy: ApiAfterDeploy,
    Cms: {
        OnEntryBeforeCreate
    }
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
