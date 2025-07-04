import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService, UiService } from "~/abstractions/index.js";
import chalk from "chalk";

interface IAboutCommandParams {
    json?: boolean;
}

const NO_VALUE = "-";

export class AboutCommand implements Command.Interface<IAboutCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private stdioService: StdioService.Interface,
        private uiService: UiService.Interface
    ) {}

    execute(): Command.Result<IAboutCommandParams> {
        return {
            name: "about",
            description: "Uis out information helpful for debugging purposes.",
            options: [
                {
                    name: "json",
                    description: "Emit output as JSON.",
                    type: "boolean",
                    default: false
                }
            ],
            handler: async (args: IAboutCommandParams) => {
                const data = await this.getProjectSdkService.execute().getProjectInfo();
                const stdio = this.stdioService;
                const ui = this.uiService;

                if (args.json) {
                    ui.text(JSON.stringify(data, null, 2));
                    return;
                }

                const { pulumi, host, wcp, webiny } = data;

                [
                    {
                        sectionName: "Webiny Project",
                        data: {
                            // Name: data.project.name,
                            // Version: context.project.version,
                            // "Database Setup": getDatabaseSetupLabel(),
                            "Debug Enabled": webiny.debugEnabled ? "Yes" : "No"
                            // "Feature Flags": process.env.WEBINY_FEATURE_FLAGS
                        }
                    },
                    {
                        sectionName: "Webiny Control Panel (WCP)",
                        data: {
                            "Project ID": wcp.projectId,
                            // User: wcpUser?.email || NO_VALUE,
                            "Using Project Environment API Key": wcp.usingProjectEnvironmentApiKey
                                ? "Yes"
                                : "No"
                        }
                    },
                    {
                        sectionName: "Host",
                        data: {
                            OS: host.os,
                            "Node.js": host.nodeJs,
                            NPM: host.npm,
                            NPX: host.npx,
                            Yarn: host.yarn,
                            "Is CI": host.isCI ? "Yes" : "No"
                        }
                    },
                    {
                        sectionName: "Pulumi",
                        data: {
                            "@pulumi/pulumi": pulumi["@pulumi/pulumi"],
                            "@pulumi/aws": pulumi["@pulumi/aws"],
                            "Secrets Provider": pulumi.secretsProvider,
                            "Using Password": pulumi.usingPassword ? "Yes" : "No"
                        }
                    }
                ].forEach(({ sectionName, data }, index) => {
                    ui.text(chalk.bold(sectionName));
                    ui.newLine();

                    for (const key of Object.keys(data) as Array<keyof typeof data>) {
                        ui.text(key.padEnd(36));
                        ui.text(data[key] || NO_VALUE);
                        ui.text("\n");
                    }

                    const isLastSection = index === 3;
                    if (!isLastSection) {
                        ui.newLine();
                    }
                });
            }
        };
    }
}

export const aboutCommand = createImplementation({
    abstraction: Command,
    implementation: AboutCommand,
    dependencies: [GetProjectSdkService, StdioService, UiService]
});
