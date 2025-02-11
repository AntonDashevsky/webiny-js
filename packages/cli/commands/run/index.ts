// @ts-nocheck Migration
export default {
    type: "cli-command",
    name: "cli-command-run",
    create({ yargs, context }) {
        yargs.command(
            "run <command> [options]",
            `Run command defined in webiny.config.{js,ts}.\nNote: run from folder containing webiny.config.{js,ts} file.`,
            yargs => {
                yargs.positional("command", {
                    describe: `Command to run in webiny.config.{js,ts}`,
                    type: "string"
                });
            },
            async argv => {
                const [camelCase, findUp, path] = await Promise.all([
                    import("camelcase").then(m => m.default ?? m),
                    import("find-up").then(m => m.default ?? m),
                    import("path").then(m => m.default ?? m)
                ]);

                const configFile = await findUp(["webiny.config.ts", "webiny.config.js"]);

                let config = await import(configFile).then(m => (m.default ? m.default : m));

                const command = camelCase(argv.command);
                if (typeof config === "function") {
                    config = config({
                        options: { ...argv, cwd: path.dirname(configFile) },
                        context
                    });
                }

                if (config.commands && typeof config.commands[command] === "function") {
                    return await config.commands[command]({ ...argv }, context);
                }

                throw Error(`Command "${command}" is not defined in "${configFile}"!`);
            }
        );
    }
};
