import { Container } from "@webiny/di-container";
import { Argv, PositionalOptions } from "yargs";
import yargs from "yargs/yargs";
import { createCliContainer } from "./createCliContainer.js";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { CommandsRegistryService, Command } from "~/abstractions/index.js";

const { blue, red, bold, bgYellow } = chalk;

const onFail = () => (msg: string, error: any, yargs: Argv) => {
    if (msg) {
        if (msg.includes("Not enough non-option arguments")) {
            console.log();
            console.error(red("Command was not invoked as expected!"));
            console.info(
                `Some non-optional arguments are missing. See the usage examples printed below.`
            );
            console.log();
            yargs.showHelp();
            return;
        }

        if (msg.includes("Missing required argument")) {
            const args = msg
                .split(":")[1]
                .split(",")
                .map(v => v.trim());

            console.log();
            console.error(red("Command was not invoked as expected!"));
            console.info(
                `Missing required argument(s): ${args
                    .map(arg => red(arg))
                    .join(", ")}. See the usage examples printed below.`
            );
            console.log();
            yargs.showHelp();
            return;
        }
        console.log();
        console.error(red("Command execution was aborted!"));
        console.error(msg);
        console.log(error);

        process.exit(1);
    }

    console.log();
    // Unfortunately, yargs doesn't provide passed args here, so we had to do it via process.argv.
    const debugEnabled = process.argv.includes("--debug");
    if (debugEnabled) {
        console.debug(error);
    } else {
        console.error(error.message);
    }

    // const gracefulError = error.cause?.gracefulError;
    // if (gracefulError instanceof Error) {
    //     console.log();
    //     console.log(bgYellow(bold("💡 How can I resolve this?")));
    //     console.log(gracefulError.message);
    // }
    //
    // const plugins = context.plugins.byType("cli-command-error");
    // for (let i = 0; i < plugins.length; i++) {
    //     const plugin = plugins[i];
    //     plugin.handle({
    //         error,
    //         context
    //     });
    // }

    process.exit(1);
};

export class Cli {
    private cli: Argv;
    private container: Container;

    private constructor() {
        this.cli = yargs(hideBin(process.argv))
            .usage("Usage: $0 <command> [options]")
            .help(false)
            .demandCommand(1)
            .recommendCommands()
            .scriptName("webiny")
            .epilogue(
                `To find more information, docs and tutorials, see ${blue(
                    "https://www.webiny.com/docs"
                )}.`
            )
            .epilogue(`Want to contribute? ${blue("https://github.com/webiny/webiny-js")}.`)
            .fail(onFail());

        this.container = createCliContainer();

        const commands = this.container.resolve(CommandsRegistryService).execute();

        for (const command of commands) {
            const { name, description, params = [], options = [], handler } = command.execute();

            let yargsCmd = name;
            if (params.length > 0) {
                yargsCmd +=
                    " " +
                    params
                        .map(param => {
                            return param.required ? `<${param.name}>` : `[${param.name}]`;
                        })
                        .join(" ");
            }

            this.cli.command(
                yargsCmd,
                description,
                yargs => {
                    params.forEach((param: Command.ParamDefinition) => {
                        const { name, ...rest } = param;
                        const mappedParams = Object.entries(rest).reduce((acc, [key, value]) => {
                            if (key === "required") {
                                acc["demandOption"] = value as boolean;
                            }

                            // @ts-ignore Key is always a valid PositionalOptions key.
                            acc[key] = value;
                            return acc;
                        }, {} as PositionalOptions);

                        yargs.positional(name, mappedParams);
                    });

                    options.forEach((param: Command.OptionDefinition) => {
                        const { name, ...rest } = param;
                        const mappedOptions = Object.entries(rest).reduce((acc, [key, value]) => {
                            if (key === "required") {
                                acc["demandOption"] = value as boolean;
                            }

                            // @ts-ignore Key is always a valid PositionalOptions key.
                            acc[key] = value;
                            return acc;
                        }, {} as PositionalOptions);

                        yargs.option(name, mappedOptions);
                    });
                },
                (args: any) => handler(args)
            );
        }

        // Enable help and run the CLI.
        this.cli.help(true);
    }

    parse() {
        return this.cli.parse();
    }

    static async init() {
        return new Cli();
    }
}
