import { serializeError } from "serialize-error";
import { getCli } from "@webiny/cli";
import { requireConfigWithExecute } from "~/utils/index.js";

(async () => {
    const workerData = JSON.parse(process.argv[2]);
    const { package: pkg, env, variant, region, debug } = workerData;

    const options = { cwd: pkg.paths.root, env, variant, region, debug };

    const config = await requireConfigWithExecute(pkg.paths.config, {
        options,
        context: getCli()
    });

    const hasBuildCommand = config.commands && typeof config.commands.build === "function";
    if (!hasBuildCommand) {
        throw new Error("Build command not found.");
    }

    config.commands.build(options).catch(error => {
        // Send error message to the parent process
        process.send!(serializeError(error));
        process.exit(1); // Ensure the worker process exits with an error code
    });
})();
