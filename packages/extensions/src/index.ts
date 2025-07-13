import { CliCommand } from "@webiny/cli-core/extensions/index.js";
import { ApiBeforeBuild, ApiBeforeDeploy } from "@webiny/project/extensions/index.js";

export const Cli = {
    Command: CliCommand
};

export const Api = {
    BeforeBuild: ApiBeforeBuild,
    BeforeDeploy: ApiBeforeDeploy
};
