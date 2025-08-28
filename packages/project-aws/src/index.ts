import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
  // Hooks.
  AdminAfterBuild,
  AdminAfterDeploy,
  AdminBeforeBuild,
  AdminBeforeDeploy,
  ApiAfterBuild,
  ApiAfterDeploy,
  ApiBeforeBuild,
  ApiBeforeDeploy,
  AwsTags,
  CoreAfterBuild,
  CoreAfterDeploy,
  CoreBeforeBuild,
  CoreBeforeDeploy,
  // Pulumi.
  CorePulumi,
  ProductionEnvironments,
  ProjectDecorator,
  ProjectId,
  PulumiResourceNamePrefix,
  Telemetry,
  WebsiteAfterBuild,
  WebsiteAfterDeploy,
  WebsiteBeforeBuild,
  WebsiteBeforeDeploy
} from "@webiny/project/extensions/index.js";

// Components.
export { IsEnv } from "@webiny/project/extensions/components/index.js";

// Cms.
import { OnEntryBeforeCreate } from "@webiny/api-headless-cms/extensions/index.js";
import { AdminExtension } from "@webiny/app-admin/extensions/index.js";

import { LegacyContextPlugin } from "@webiny/api/extensions/index.js";

// Exports.
export { Webiny } from "./Webiny.js";

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
    AfterDeploy: AdminAfterDeploy,
    Extension: AdminExtension
};

export const Api = {
    BeforeBuild: ApiBeforeBuild,
    BeforeDeploy: ApiBeforeDeploy,
    AfterBuild: ApiAfterBuild,
    AfterDeploy: ApiAfterDeploy,
    Cms: {
        OnEntryBeforeCreate
    },
    Legacy: {
        ContextPlugin: LegacyContextPlugin
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
