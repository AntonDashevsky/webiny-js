import fs from "fs-extra";
import path from "path";
import { renames } from "./renames.js";
import { updatePackageJson } from "./updatePackageJson.js";
import { runInteractivePrompt } from "./runInteractivePrompt.js";
import { CliParams } from "../../../../types.js";
import { GetProjectRootPath } from "../../../../services/index.js";
import { AwsProjectParams } from "./types.js";
import { GetTemplatesFolderPath } from "../../../../services/GetTemplatesFolderPath.js";

export class SetupAwsWebinyProject {
    async execute(cliArgs: CliParams) {
        const awsArgs = await this.getAwsArgs(cliArgs);

        const getTemplatesFolderPath = new GetTemplatesFolderPath();
        const templatesFolderPath = getTemplatesFolderPath.execute();

        const baseTemplatePath = path.join(templatesFolderPath, "aws", "base");
        const storageTemplatePath = path.join(templatesFolderPath, "aws", awsArgs.storageOps);

        const getProjectRoot = new GetProjectRootPath();
        const projectRootFolderPath = getProjectRoot.execute(cliArgs);

        fs.copySync(baseTemplatePath, projectRootFolderPath);
        fs.copySync(storageTemplatePath, projectRootFolderPath);

        for (let i = 0; i < renames.length; i++) {
            fs.moveSync(
                path.join(projectRootFolderPath, renames[i].prev),
                path.join(projectRootFolderPath, renames[i].next),
                {
                    overwrite: true
                }
            );
        }

        updatePackageJson(cliArgs);

        // Update .env file.
        const rootEnvFilePath = path.join(projectRootFolderPath, ".env");
        let content = fs.readFileSync(rootEnvFilePath).toString();
        content = content.replace("{REGION}", awsArgs.region);
        fs.writeFileSync(rootEnvFilePath, content);
    }

    private async getAwsArgs(cliArgs: CliParams) {
        const awsArgs: AwsProjectParams = { region: "us-east-1", storageOps: "ddb" };

        const { templateOptions: templateOptionsString } = cliArgs;
        if (templateOptionsString) {
            try {
                Object.assign(JSON.parse(templateOptionsString));
            } catch {
                // Do nothing.
            }
        }

        if (cliArgs.interactive !== false) {
            Object.assign(awsArgs, await runInteractivePrompt());
        }

        return awsArgs;
    }
}
