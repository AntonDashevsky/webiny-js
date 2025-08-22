import "tsx/esm";
import { serializeError } from "serialize-error";
import { requireConfigWithExecute } from "~/utils/index.js";
import chalk from "chalk";

const workerData = JSON.parse(process.argv[2]);
const { package: pkg, env, variant, region, debug } = workerData;

const options = { cwd: pkg.paths.packageFolder, env, variant, region, debug };

const config = await requireConfigWithExecute(pkg.paths.webinyConfigFile, {
    options
});

const hasWatch = config.commands && typeof config.commands.watch === "function";
if (hasWatch) {
    // TODO: remove {} as any
    config.commands.watch(options, {} as any).catch(error => {
        // Send error message to the parent process
        process.send!(serializeError(error));
        process.exit(1); // Ensure the worker process exits with an error code
    });
} else {
    process.stdout.write(
        `Skipping watch; ${chalk.yellow(
            "watch"
        )} command is missing. Check package's ${chalk.yellow("webiny.config.ts")} file.`
    );
}
