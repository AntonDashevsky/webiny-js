import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
    AdminAfterBuild,
    AdminAfterDeploy,
    AdminBeforeBuild,
    AdminBeforeDeploy,
    AdminBeforeWatch,
    AdminPulumi,
    ApiAfterBuild,
    ApiAfterDeploy,
    ApiBeforeBuild,
    ApiBeforeDeploy,
    ApiBeforeWatch,
    ApiPulumi,
    CoreAfterBuild,
    CoreAfterDeploy,
    CoreBeforeBuild,
    CoreBeforeDeploy,
    CoreBeforeWatch,
    CorePulumi,
    ProductionEnvironments,
    ProjectId,
    PulumiResourceNamePrefix,
    Telemetry
} from "@webiny/project/extensions/index.js";

import {
    AwsTags,
    Vpc,
    AdminCustomDomains,
    BlueGreenDeployments
} from "~/pulumi/extensions/index.js";
import { ElasticSearch } from "./extensions/ElasticSearch.js";
import { OpenSearch } from "./extensions/OpenSearch.js";

export { Webiny } from "./extensions/Webiny.js";

// Cms.
import { OnEntryBeforeCreate } from "@webiny/api-headless-cms/extensions/index.js";
import { AdminExtension } from "@webiny/app-admin/extensions/index.js";

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
    BlueGreenDeployments: BlueGreenDeployments,
    ElasticSearch,
    OpenSearch,
    PulumiResourceNamePrefix,
    ProductionEnvironments,
    AwsTags,
    Admin: {
        BeforeBuild: AdminBeforeBuild,
        BeforeDeploy: AdminBeforeDeploy,
        BeforeWatch: AdminBeforeWatch,
        AfterBuild: AdminAfterBuild,
        AfterDeploy: AdminAfterDeploy,
        Pulumi: AdminPulumi,
        CustomDomains: AdminCustomDomains
    },
    Api: {
        BeforeBuild: ApiBeforeBuild,
        BeforeDeploy: ApiBeforeDeploy,
        BeforeWatch: ApiBeforeWatch,
        AfterBuild: ApiAfterBuild,
        AfterDeploy: ApiAfterDeploy,
        Pulumi: ApiPulumi
    },
    Core: {
        BeforeBuild: CoreBeforeBuild,
        BeforeDeploy: CoreBeforeDeploy,
        BeforeWatch: CoreBeforeWatch,
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
