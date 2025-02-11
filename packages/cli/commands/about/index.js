const NO_VALUE = "-";
import { isCI } from "ci-info";
import chalk from "chalk";

const getData = async context => {
    const { getUser } = await import("../wcp/utils/index.js");
    const { getNpxVersion } = await import("./getNpxVersion.js");
    const { getNpmVersion } = await import("./getNpmVersion.js");
    const { getPulumiVersions } = await import("./getPulumiVersions.js");
    const { getYarnVersion } = await import("./getYarnVersion.js");
    const { getDatabaseSetupLabel } = await import("./getDatabaseSetup.js");

    const [pulumiVersion, pulumiAwsVersion] = await getPulumiVersions();

    const wcpProjectId = process.env.WCP_PROJECT_ID;
    const wcpUser = await getUser().catch(() => null);
    const wcpUsingProjectEnvironmentApiKey = Boolean(process.env.WCP_ENVIRONMENT_API_KEY);

    return [
        {
            sectionName: "Webiny Project",
            data: {
                Name: context.project.name,
                Version: context.project.version,
                "Database Setup": getDatabaseSetupLabel(),
                "Debug Enabled": process.env.DEBUG === "true" ? "Yes" : "No",
                "Feature Flags": process.env.WEBINY_FEATURE_FLAGS || "N/A"
            }
        },
        {
            sectionName: "Webiny Control Panel (WCP)",
            data: {
                "Project ID": wcpProjectId,
                User: wcpUser?.email || "N/A",
                "Using Project Environment API Key": wcpUsingProjectEnvironmentApiKey ? "Yes" : "No"
            }
        },
        {
            sectionName: "Host",
            data: {
                OS: `${process.platform} (${process.arch})`,
                "Node.js": process.version,
                NPM: await getNpmVersion(),
                NPX: await getNpxVersion(),
                Yarn: await getYarnVersion(),
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
};

export default {
    type: "cli-command",
    name: "cli-command-about",
    create({ yargs, context }) {
        yargs.command(
            "about",
            `Prints out information helpful for debugging purposes.`,
            yargs => {
                yargs.option("json", {
                    describe: "Emit output as JSON.",
                    type: "boolean",
                    default: false
                });
            },
            async yargs => {
                const data = await getData(context);

                if (yargs.json) {
                    console.log(JSON.stringify(data, null, 2));
                    return;
                }

                data.forEach(({ sectionName, data }, index) => {
                    if (index > 0) {
                        console.log();
                    }

                    console.log(chalk.bold(sectionName));

                    Object.keys(data).forEach(key => {
                        console.log(key.padEnd(36), data[key] || NO_VALUE);
                    });
                });
            }
        );
    }
};
