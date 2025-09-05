import execa from "execa";
import fs from "fs-extra";
import Listr from "listr";
import path from "path";
import { rimrafSync } from "rimraf";
import chalk from "chalk";
import yesno from "yesno";
import { GracefulError } from "./CreateWebinyProject/GracefulError.js";
import { SetupBaseWebinyProject } from "./CreateWebinyProject/projects/base/SetupBaseWebinyProject.js";
import { SetupAwsWebinyProject } from "./CreateWebinyProject/projects/aws/SetupAwsWebinyProject.js";
import { EnsureNoYarnLockPackageJson } from "../services/EnsureNoYarnLockPackageJson.js";
import { EnsureNoGlobalWebinyCli } from "../services/EnsureNoGlobalWebinyCli.js";
import { IsGitAvailable } from "../services/IsGitAvailable.js";
import { SetupYarn } from "../services/SetupYarn.js";
import { InitGit } from "../services/InitGit.js";
import { SetWebinyPackageVersions } from "../services/SetWebinyPackageVersions.js";
import { EnsureValidProjectName } from "../services/EnsureValidProjectName.js";
import { EnsureNoTargetFolder } from "../services/EnsureNoTargetFolder.js";
import { Analytics } from "../services/Analytics.js";
import { PrintSystemInfo } from "../services/PrintSystemInfo.js";
import { GetProjectRootPath } from "../services/GetProjectRootPath.js";

const { green, bold } = chalk;

export class CreateWebinyProject {
    async execute(cliArgs) {
        const { projectName, debug, force, cleanup, log, paths, assignToYarnRc } = cliArgs;

        if (!projectName) {
            throw Error("You must provide a name for the project to use.");
        }

        const getProjectRootPath = new GetProjectRootPath();
        const projectRootPath = getProjectRootPath.execute(cliArgs);

        // All of these `ensureXyz` services will terminate the process if something is wrong.
        const ensureValidProjectName = new EnsureValidProjectName();
        ensureValidProjectName.execute(projectName);

        const ensureNoTargetFolder = new EnsureNoTargetFolder();
        ensureNoTargetFolder.execute(projectRootPath, projectName, force);

        const ensureNoYarnLockPackageJson = new EnsureNoYarnLockPackageJson();
        await ensureNoYarnLockPackageJson.execute();

        const ensureNoGlobalWebinyCli = new EnsureNoGlobalWebinyCli();
        await ensureNoGlobalWebinyCli.execute();

        let isGitAvailable = new IsGitAvailable().execute();

        console.log(`Initializing a new Webiny project in ${green(projectRootPath)}...`);

        const analytics = new Analytics();
        await analytics.track("start");

        try {
            const tasks = new Listr(
                [
                    {
                        // Creates root package.json.
                        title: "Prepare project folder",
                        task: () => fs.ensureDirSync(projectName)
                    },
                    {
                        // Setup yarn
                        title: "Setup Yarn",
                        task: async () => {
                            const setupYarn = new SetupYarn();
                            await setupYarn.execute({ projectRootPath, assignToYarnRc });
                        }
                    },
                    isGitAvailable
                        ? {
                              // Initialize `git` by executing `git init` in project directory.
                              title: `Initialize git`,
                              task: (_, task) => {
                                  const initGit = new InitGit();
                                  try {
                                      initGit.execute({ projectRootPath, task });
                                  } catch (err) {
                                      task.skip("Git repo not initialized", err);
                                  }
                              }
                          }
                        : null
                ].filter(Boolean)
            );

            await tasks.run();

            const setupBaseWebinyProject = new SetupBaseWebinyProject();
            await setupBaseWebinyProject.execute(cliArgs);

            const setupAwsWebinyProject = new SetupAwsWebinyProject();
            await setupAwsWebinyProject.execute(cliArgs);

            const setWebinyPackageVersions = new SetWebinyPackageVersions();
            await setWebinyPackageVersions.execute(paths.packageJsonFile);

            await analytics.track("end");
        } catch (err) {
            let stage = "error";
            if (err instanceof GracefulError) {
                stage = "error-graceful";
            }

            await analytics.track(stage, {
                errorMessage: err.cause?.message || err.message,
                errorStack: err.cause?.stack || err.stack
            });

            const printSystemInfo = new PrintSystemInfo();
            printSystemInfo.execute();

            console.log(`Writing logs to ${green(path.resolve(log))}...`);
            fs.writeFileSync(path.resolve(log), err.toString());

            console.log();
            if (cleanup) {
                console.log("Deleting created files and folders...");
                rimrafSync(projectRootPath);
            } else {
                console.log("Project cleanup skipped.");
            }

            process.exit(1);
        }

        console.log();
        console.log(
            `🎉 Your new Webiny project ${green(
                projectName
            )} has been created and is ready to be deployed for the first time!`
        );
        console.log();

        const ok = await yesno({
            question: bold(`${green("?")} Would you like to deploy your project now (Y/n)?`),
            defaultValue: true
        });

        console.log();

        if (ok) {
            console.log("🚀 Deploying your new Webiny project...");
            console.log();

            try {
                const command = ["webiny", "deploy"];
                if (debug) {
                    command.push("--debug");
                }

                await execa("yarn", command, {
                    cwd: projectRootPath,
                    stdio: "inherit"
                });
            } catch {
                // Don't do anything. This is because the `webiny deploy` command has its own
                // error handling and will print the error message. As far as this setup script
                // is concerned, it succeeded, and it doesn't need to do anything else.
            }

            return;
        }

        console.log(
            [
                `Finish the setup by running the following command: ${green(
                    `cd ${projectName} && yarn webiny deploy`
                )}`,
                "",
                `To see all of the available CLI commands, run ${green(
                    "yarn webiny --help"
                )} in your ${green(projectName)} directory.`,
                "",
                "Want to dive deeper into Webiny? Check out https://webiny.com/docs/!",
                "Like the project? Star us on https://github.com/webiny/webiny-js!",
                "",
                "Need help? Join our Slack community! https://www.webiny.com/slack",
                "",
                "🚀 Happy coding!"
            ].join("\n")
        );
    }
}
