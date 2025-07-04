import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import { Transform } from "node:stream";
import chalk from "chalk";
import { getRandomColorForString } from "./utils";

export interface IWatchCommandParams extends IBaseAppParams {}

export class WatchCommand implements Command.Interface<IWatchCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private stdioService: StdioService.Interface
    ) {}

    execute(): Command.Result<IWatchCommandParams> {
        const projectSdk = this.getProjectSdkService.execute();
        const stdio = this.stdioService;

        return {
            name: "watch",
            description: "Watches code changes for a specific app or package.",
            examples: [
                "watch api --env dev",
                "watch admin --env prod",
                "watch -p my-package1,my-package2",
                "watch api --env dev -p my-package1,my-package2"
            ],
            params: [
                {
                    name: "app",
                    description: "Name of the app (core, admin, or api)",
                    type: "string"
                }
            ],
            options: [
                {
                    name: "env",
                    description: "Environment name (dev, prod, etc.)",
                    type: "string"
                },
                {
                    name: "variant",
                    description: "Variant of the app to watch",
                    type: "string",
                    validation: (params) => {
                        const isValid = projectSdk.isValidVariantName(params.variant);
                        if (isValid.isErr()) {
                            throw isValid.error;
                        }
                        return true;
                    }
                },
                {
                    name: "region",
                    description: "Region to target",
                    type: "string",
                    validation: (params) => {
                        const isValid = projectSdk.isValidRegionName(params.region)
                        if (isValid.isErr()) {
                            throw isValid.error;
                        }
                        return true;
                    }
                },
                {
                    name: "package",
                    alias: "p",
                    description: `One or more packages that will be watched for code changes`,
                    type: "string"
                }
            ],
            handler: async (params: IWatchCommandParams) => {
                const watchProcesses = await projectSdk.watch(params);

                if (watchProcesses.length === 1) {
                    const [watchProcess] = watchProcesses;
                    watchProcess.process.stdout!.pipe(stdio.getStdout());
                    watchProcess.process.stderr!.pipe(stdio.getStderr());
                } else {
                    if (watchProcesses.length > 1) {
                        stdio.info(
                            `Watching ${watchProcesses.length} packages. Output will be displayed below:\n`
                        );

                        watchProcesses.forEach(watchProcess => {
                            const { packageName, process: childProcess } = watchProcess;
                            const pkgPrefix = chalk.hex(getRandomColorForString(packageName))(
                                packageName
                            );

                            if (childProcess.stdout) {
                                const prefixedStdout = createPrefixer(pkgPrefix);
                                childProcess.stdout.pipe(prefixedStdout).pipe(stdio.getStdout());
                            }

                            if (childProcess.stderr) {
                                const prefixedStderr = createPrefixer(pkgPrefix);
                                childProcess.stderr.pipe(prefixedStderr).pipe(stdio.getStderr());
                            }
                        });
                    }
                }
            }
        };
    }
}

function createPrefixer(prefix: string) {
    // This returns a Transform stream that prefixes each line
    return new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            const str = chunk.toString();
            const lines = str.split(/\r?\n/);
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() !== "") {
                    this.push(`${prefix}: ${lines[i]}\n`);
                }
            }
            callback();
        }
    });
}

export const watchCommand = createImplementation({
    abstraction: Command,
    implementation: WatchCommand,
    dependencies: [GetProjectSdkService, StdioService]
});

/*

yargs
    .option("region", {
        describe: `Region to target`,
        type: "string",
        required: false
    })
    .check(validateRegion);
    .option("variant", {
        describe: `Variant`,
        type: "string",
        required: false
    })
    .check(validateVariant);

yargs.option("function", {
    alias: "f",
    describe:
        "One or more functions that will invoked locally (used with local AWS Lambda development)",
    type: "string"
});
yargs.option("inspect", {
    alias: "i",
    describe:
        "[EXPERIMENTAL] Enable Node debugger (used with local AWS Lambda development)",
    type: "boolean"
});
yargs.option("depth", {
    describe: `The level of dependencies that will be watched for code changes`,
    type: "number",
    default: 2
});
yargs.option("debug", {
    default: false,
    describe: `Turn on debug logs`,
    type: "boolean"
});
yargs.option("increase-timeout", {
    default: 120,
    describe: `Increase AWS Lambda function timeout (passed as number of seconds, used with local AWS Lambda development)`,
    type: "number"
});
yargs.option("increase-handshake-timeout", {
    default: 5,
    describe: `Increase timeout for the initial handshake between a single AWS Lambda invocation and local code execution (passed as number of seconds, used with local AWS Lambda development)`,
    type: "number"
});
yargs.option("allow-production", {
    default: false,
    describe: `Enables running the watch command with "prod" and "production" environments (not recommended).`,
    type: "boolean"
});*/