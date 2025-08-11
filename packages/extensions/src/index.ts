import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
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
    
    Telemetry
} from "@webiny/project/extensions/index.js";

export const Project = {
    Telemetry
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
    AfterDeploy: CoreAfterDeploy
};

export const Website = {
    BeforeBuild: WebsiteBeforeBuild,
    BeforeDeploy: WebsiteBeforeDeploy,
    AfterBuild: WebsiteAfterBuild,
    AfterDeploy: WebsiteAfterDeploy
};