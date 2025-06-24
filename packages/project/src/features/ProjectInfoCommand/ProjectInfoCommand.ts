import { createImplementation } from "@webiny/di-container";
import {
    ProjectInfoCommand,
    GetIsCi,
    GetNpmVersion,
    GetNpxVersion,
    GetPulumiVersion,
    GetYarnVersion,
} from "~/abstractions";

export class DefaultProjectInfoCommand implements ProjectInfoCommand.Interface {
    getIsCi: GetIsCi.Interface;
    getNpmVersion: GetNpmVersion.Interface;
    getNpxVersion: GetNpxVersion.Interface;
    getPulumiVersion: GetPulumiVersion.Interface;
    getYarnVersion: GetYarnVersion.Interface;

    constructor(
        getIsCi: GetIsCi.Interface,
        getNpmVersion: GetNpmVersion.Interface,
        getNpxVersion: GetNpxVersion.Interface,
        getPulumiVersion: GetPulumiVersion.Interface,
        getYarnVersion: GetYarnVersion.Interface
    ) {
        this.getIsCi = getIsCi;
        this.getNpmVersion = getNpmVersion;
        this.getNpxVersion = getNpxVersion;
        this.getPulumiVersion = getPulumiVersion;
        this.getYarnVersion = getYarnVersion;
    }

    async execute() {
        const wcpProjectId = process.env.WCP_PROJECT_ID;
        // const wcpUser = await getUser().catch(() => null);
        const wcpUsingProjectEnvironmentApiKey = Boolean(process.env.WCP_ENVIRONMENT_API_KEY);

        const isCI = this.getIsCi.execute();
        const npmVersion = this.getNpmVersion.execute();
        const npxVersion = this.getNpxVersion.execute();
        const yarnVersion = this.getYarnVersion.execute();
        const [pulumiVersion, pulumiAwsVersion] = this.getPulumiVersion.execute();

        return [
            {
                sectionName: "Webiny Project",
                data: {
                    // Name: context.project.name,
                    // Version: context.project.version,
                    // "Database Setup": getDatabaseSetupLabel(),
                    "Debug Enabled": process.env.DEBUG === "true" ? "Yes" : "No",
                    "Feature Flags": process.env.WEBINY_FEATURE_FLAGS || "N/A"
                }
            },
            {
                sectionName: "Webiny Control Panel (WCP)",
                data: {
                    "Project ID": wcpProjectId,
                    // User: wcpUser?.email || "N/A",
                    "Using Project Environment API Key": wcpUsingProjectEnvironmentApiKey
                        ? "Yes"
                        : "No"
                }
            },
            {
                sectionName: "Host",
                data: {
                    OS: `${process.platform} (${process.arch})`,
                    "Node.js": process.version,
                    NPM: npmVersion,
                    NPX: npxVersion,
                    Yarn: yarnVersion,
                    "Is CI": isCI ? "Yes" : "No"
                }
            },
            {
                sectionName: "Pulumi",
                data: {
                    "@pulumi/pulumi": pulumiVersion,
                    "@pulumi/aws": pulumiAwsVersion,
                    "Secrets Provider": process.env.PULUMI_SECRETS_PROVIDER,
                    "Using Password": process.env.PULUMI_CONFIG_PASSPHRASE ? "Yes" : "No"
                }
            }
        ];
    }
}

export const projectInfoCommand = createImplementation({
    abstraction: ProjectInfoCommand,
    implementation: DefaultProjectInfoCommand,
    dependencies: [
        GetIsCi,
        GetNpmVersion,
        GetNpxVersion,
        GetPulumiVersion,
        GetYarnVersion
    ]
});
