import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService, UiService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import { measureDuration } from "./utils/index.js";
import ora from "ora";

export interface IDeployCommandParams extends IBaseAppParams {
    build?: boolean;
    preview?: boolean;
    deploymentLogs?: boolean;
}

const spinnerMessages: [number, string][] = [
    [60, "Still deploying..."],
    [120, "Still deploying, please wait..."],
    [180, "Some resources take some time to become ready, please wait..."],

    [270, "Still deploying, please don't interrupt..."],
    [360, "Still deploying, please be patient..."],
    [450, "Still deploying, please don't interrupt..."],
    [540, "Still deploying, please be patient..."],

    [600, "Deploying for 10 minutes now, probably a couple more to go..."],
    [720, "Still deploying, shouldn't be much longer now..."],

    [840, "Looks like it's taking a bit longer than usual, please wait..."],
    [900, "Deploying for 15 minutes now, hopefully it's almost done..."],

    [1200, "Deploying for 20 minutes now, hopefully it's almost done..."]
];

export class DeployCommand implements Command.Interface<IDeployCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private uiService: UiService.Interface,
        private stdioService: StdioService.Interface
    ) {}

    execute(): Command.Result<IDeployCommandParams> {
        const projectSdk = this.getProjectSdkService.execute();
        const ui = this.uiService;
        const stdio = this.stdioService;

        return {
            name: "deploy",
            description: "Deploys specified app",
            examples: ["$0 deploy api --env dev", "$0 deploy admin --env prod"],
            params: [
                {
                    name: "app",
                    description: "Name of the app (core, admin, or api)",
                    type: "string",
                    required: true
                }
            ],
            options: [
                {
                    name: "env",
                    description: "Environment name (dev, prod, etc.)",
                    type: "string",
                    required: true
                },
                {
                    name: "variant",
                    description: "Variant of the app to deploy",
                    type: "string"
                },
                {
                    name: "region",
                    description: "Region to target",
                    type: "string"
                },
                {
                    name: "build",
                    description: "Build packages before deploying",
                    type: "boolean",
                    default: true
                },
                {
                    name: "preview",
                    description: "Preview the deploy instead of actually performing it",
                    type: "boolean",
                    default: false
                },
                {
                    name: "deployment-logs",
                    description: "Print deployment logs (automatically enabled in CI environments)",
                    type: "boolean",
                    default: false
                }
            ],
            handler: async (params: IDeployCommandParams) => {
                // We always show deployment logs when doing previews.
                const projectInfo = await projectSdk.getProjectInfo();
                const showDeploymentLogs = projectInfo.host.isCI || params.deploymentLogs;

                const getDeploymentDuration = measureDuration();

                const spinner = ora("Deploying...");

                try {
                    const { pulumiProcess } = await projectSdk.deployApp(params);

                    if (showDeploymentLogs) {
                        pulumiProcess.stdout!.pipe(stdio.getStdout());
                        pulumiProcess.stderr!.pipe(stdio.getStderr());
                        await pulumiProcess;
                    } else {
                        spinner.start();

                        // When showing spinner, we want to show a few messages to the user.
                        // The deployment process can take in some cases 10-15 minutes, so we want to
                        // give the user some feedback.
                        const timeouts = spinnerMessages.map(([seconds, message]) => {
                            return setTimeout(() => {
                                spinner.text = message;
                            }, seconds * 1000);
                        });

                        // Every second, let's add a dot to the end of the message. Once we reach
                        // three, we start over.
                        const interval = setInterval(() => {
                            const spinnerText = spinner.text;
                            if (spinnerText.endsWith("...")) {
                                spinner.text = spinnerText.substring(0, spinnerText.length - 3);
                            } else {
                                spinner.text = spinnerText + ".";
                            }
                        }, 1000);

                        try {
                            await pulumiProcess;
                        } finally {
                            timeouts.forEach(clearTimeout);
                            clearInterval(interval);
                        }
                    }

                    const message = `Deployed in ${getDeploymentDuration()}.`;

                    if (showDeploymentLogs) {
                        ui.success(message);
                    } else {
                        spinner.succeed(message);
                    }
                } catch (e) {
                    if (showDeploymentLogs) {
                        throw e;
                    }

                    spinner.fail("Deployment failed.");
                    throw e;
                }
            }
        };
    }
}

export const deployCommand = createImplementation({
    abstraction: Command,
    implementation: DeployCommand,
    dependencies: [GetProjectSdkService, UiService, StdioService]
});
