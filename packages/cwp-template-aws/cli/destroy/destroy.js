import fs from "fs";
import path from "path";
import execa from "execa";
import chalk from "chalk";
import { getPulumi } from "@webiny/project/utils/index.js";

const { green } = chalk;

const convertToBoolean = value => {
    return value === "true" || value === true;
};

const destroy = ({ stack, env, variant, inputs }) => {
    const command = [
        "webiny",
        "destroy",
        stack,
        "--env",
        env,
        "--debug",
        convertToBoolean(inputs.debug),
        "--build",
        convertToBoolean(inputs.build),
        "--preview",
        convertToBoolean(inputs.preview)
    ];
    if (variant) {
        command.push("--variant", variant);
    }
    return execa("yarn", command, {
        stdio: "inherit"
    });
};

export default async (inputs, context) => {
    const { env, variant = "" } = inputs;

    // This will ensure that the user has Pulumi CLI installed.
    await getPulumi();

    const hasCore = fs.existsSync(path.join(context.project.root, "apps", "core"));

    console.log();
    context.info(`Destroying ${green("Website")} project application...`);
    await destroy({
        stack: "apps/website",
        env,
        variant,
        inputs
    });

    console.log();
    context.info(`Destroying ${green("Admin")} project application...`);
    await destroy({
        stack: "apps/admin",
        env,
        variant,
        inputs
    });

    console.log();
    context.info(`Destroying ${green("API")} project application...`);
    await destroy({
        stack: "apps/api",
        env,
        variant,
        inputs
    });

    if (hasCore) {
        console.log();
        context.info(`Destroying ${green("Core")} project application...`);
        await destroy({
            stack: "apps/core",
            env,
            variant,
            inputs
        });
    }
};
