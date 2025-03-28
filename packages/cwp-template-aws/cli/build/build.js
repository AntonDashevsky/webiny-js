import { getPulumi } from "@webiny/cli-plugin-deploy-pulumi/utils";
import execa from "execa";
import chalk from "chalk";

const build = (app, env, inputs) => {
    return execa("yarn", ["webiny", "build", app, "--env", env, "--debug", Boolean(inputs.debug)], {
        stdio: "inherit"
    });
};

export default async (inputs, context) => {
    const { env } = inputs;

    // Ensure Pulumi is installed.
    const pulumi = await getPulumi({ install: false });

    pulumi.install();

    context.info(`Building ${chalk.green("Core")} project application...`);
    await build("apps/core", env, inputs);

    console.log();
    context.info(`Building ${chalk.green("API")} project application...`);
    await build("apps/api", env, inputs);

    console.log();
    context.info(`Building ${chalk.green("Admin")} project application...`);
    await build("apps/admin", env, inputs);

    console.log();
    context.info(`Building ${chalk.green("Website")} project application...`);
    await build("apps/website", env, inputs);
};
