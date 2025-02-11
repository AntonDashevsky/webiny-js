import chalk from "chalk";
import { Pulumi } from "@webiny/pulumi-sdk";
import ora from "ora";
import merge from "lodash/merge.js";
import path from "path";
import fs from "fs";
import type { ProjectApplication } from "@webiny/cli/types";

const { green, red } = chalk;

export interface IGetPulumiParams {
    projectApplication?: Pick<ProjectApplication, "paths">;
    pulumi?: unknown;
    install?: boolean;
}

export const getPulumi = async ({ projectApplication, pulumi, install }: IGetPulumiParams = {}) => {
    const spinner = ora();

    let cwd;

    const { getCli } = await import("@webiny/cli");
    const context = getCli();
    const project = context.project;

    // When running the `webiny deploy` command without specifying the
    // project application, the `projectApplication` variable is empty.
    if (projectApplication) {
        cwd = projectApplication.paths.workspace;
        if (!fs.existsSync(cwd)) {
            const cmd = `yarn webiny build ${projectApplication.paths.relative} --env {environment}`;
            const message = [
                "The command cannot be run because the project application hasn't been built. ",
                "To build it, run ",
                red(cmd),
                "."
            ].join("");
            throw new Error(message);
        }
    }

    const instance = new Pulumi(
        merge(
            {
                pulumiFolder: path.join(project.root, ".webiny"),
                beforePulumiInstall: () => {
                    console.log(
                        `It looks like this is your first time using ${green(
                            "@webiny/pulumi-sdk"
                        )}.`
                    );
                    spinner.start(`Downloading Pulumi...`);
                },
                afterPulumiInstall: () => {
                    spinner.stopAndPersist({
                        symbol: green("✔"),
                        text: `Pulumi downloaded, continuing...`
                    });
                }
            },
            { execa: { cwd } },
            pulumi
        )
    );

    // Run install method, just in case Pulumi wasn't installed yet.
    if (install !== false) {
        await instance.install();
    }

    return instance;
};
