import { Container } from "@webiny/di-container";
import { Argv } from "yargs";
import yargs from "yargs/yargs";
import { createCliContainer } from "./createCliContainer.js";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { CommandsRegistryService, Command } from "~/abstractions/index.js";

// TODO: finish this file
const { blue } = chalk;

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
            .epilogue(`Want to contribute? ${blue("https://github.com/webiny/webiny-js")}.`);

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
                    params.forEach((param: Command.ParamDefinition<unknown>) => {
                        const { name, required, validation, ...rest } = param;

                        const yargsParam = yargs.positional(name, {
                            ...rest,
                            demandOption: required
                        });

                        if (validation) {
                            yargsParam.check(validation);
                        }
                    });

                    options.forEach((option: Command.OptionDefinition<unknown>) => {
                        const { name, required, validation, ...rest } = option;

                        const yargsOption = yargs.option(name, {
                            ...rest,
                            demandOption: required
                        });

                        if (validation) {
                            yargsOption.check(validation);
                        }
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
