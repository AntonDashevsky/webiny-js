import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
    AdminAfterBuild,
    AdminAfterDeploy,
    AdminBeforeBuild,
    AdminBeforeDeploy,
    AdminPulumi,
    ApiAfterBuild,
    ApiAfterDeploy,
    ApiBeforeBuild,
    ApiBeforeDeploy,
    ApiPulumi,
    CoreAfterBuild,
    CoreAfterDeploy,
    CoreBeforeBuild,
    CoreBeforeDeploy,
    CorePulumi,
    ProductionEnvironments,
    ProjectId,
    PulumiResourceNamePrefix,
    Telemetry
} from "@webiny/project/extensions/index.js";

import { AwsTags, Vpc, AdminCustomDomains } from "~/pulumi/extensions/index.js";
import { ElasticSearch } from "./extensions/ElasticSearch.js";
import { OpenSearch } from "./extensions/OpenSearch.js";

export { Webiny } from "./extensions/Webiny.js";

// Cms.
import { OnEntryBeforeCreate } from "@webiny/api-headless-cms/extensions/index.js";
import { AdminExtension } from "@webiny/app-admin/extensions/index.js";

// Components.
export { IsEnv } from "@webiny/project/extensions/components/index.js";

// Exports.
export const Project = {
    Id: ProjectId,
    Telemetry
};

export const Cli = {
    Command: CliCommand
};

export const Admin = { Extension: AdminExtension };

export const Infra = {
    Vpc,
    ElasticSearch,
    OpenSearch,
    PulumiResourceNamePrefix,
    ProductionEnvironments,
    AwsTags,
    Admin: {
        BeforeBuild: AdminBeforeBuild,
        BeforeDeploy: AdminBeforeDeploy,
        AfterBuild: AdminAfterBuild,
        AfterDeploy: AdminAfterDeploy,
        Pulumi: AdminPulumi,
        CustomDomains: AdminCustomDomains
    },
    Api: {
        BeforeBuild: ApiBeforeBuild,
        BeforeDeploy: ApiBeforeDeploy,
        AfterBuild: ApiAfterBuild,
        AfterDeploy: ApiAfterDeploy,
        Pulumi: ApiPulumi
    },
    Core: {
        BeforeBuild: CoreBeforeBuild,
        BeforeDeploy: CoreBeforeDeploy,
        AfterBuild: CoreAfterBuild,
        AfterDeploy: CoreAfterDeploy,
        Pulumi: CorePulumi
    }
};

export const Backend = {
    Cms: {
        OnEntryBeforeCreate
    }
};
