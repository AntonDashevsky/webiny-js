import fs from "fs-extra";
import path from "path";
import { renames } from "./renames.js";
import { updatePackageJson } from "./updatePackageJson.js";
import { updateDotEnv } from "./updateDotEnv.js";
import { runInteractivePrompt } from "./runInteractivePrompt.js";

const DEFAULT_AWS_REGION = "us-east-1";
const DEFAULT_STORAGE_OPS = "ddb";

export class SetupAwsWebinyProject {
    async execute(cliArgs) {
        const parsedTemplateOptions = cwp.getParsedTemplateOptions();

        const { region = DEFAULT_AWS_REGION, storageOperations = DEFAULT_STORAGE_OPS } =
            parsedTemplateOptions;

        /**
         * We need to check for the existence of the common and storageOperations folders to continue.
         */
        if (!storageOperations) {
            console.log("Missing storage operations parameter.");
            process.exit(1);
        }

        if (cwp.params.interactive !== false) {
            await runInteractivePrompt();
        }

        const baseTemplatePath = path.join(import.meta.dirname, `templates/base`);
        const storageTemplatePath = path.join(
            import.meta.dirname,
            `templates/${storageOperations}`
        );

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

        updatePackageJson(cwp);
        updateDotEnv(cwp);

        // if (IS_TEST) {
        //     return;
        // }
        //
        // // Install dependencies.
        // console.log();
        // const spinner = ora("Installing packages...").start();
        // try {
        //     const subprocess = execa("yarn", [], {
        //         cwd: projectRoot,
        //         maxBuffer: "500_000_000"
        //     });
        //     await subprocess;
        //     spinner.succeed("Packages installed successfully.");
        // } catch (e) {
        //     spinner.fail("Failed to install packages.");
        //
        //     console.log(e.message);
        //
        //     throw new Error(
        //         "Failed while installing project dependencies. Please check the above Yarn logs for more information.",
        //         { cause: e }
        //     );
        // }
    }
}
