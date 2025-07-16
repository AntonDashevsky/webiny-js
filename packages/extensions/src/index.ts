import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import {
    ApiAfterBuild,
    ApiAfterDeploy,
    ApiBeforeBuild,
    ApiBeforeDeploy,
    Telemetry
} from "@webiny/project/extensions/index.js";

export const Project = {
    Telemetry
};

export const Cli = {
    Command: CliCommand
};

export const Api = {
    BeforeBuild: ApiBeforeBuild,
    BeforeDeploy: ApiBeforeDeploy,
    AfterBuild: ApiAfterBuild,
    AfterDeploy: ApiAfterDeploy
};
