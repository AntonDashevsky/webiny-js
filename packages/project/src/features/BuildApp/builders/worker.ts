import "tsx/esm";
import { serializeError } from "serialize-error";
import { requireConfigWithExecute } from "./utils/requireConfig.js";

try {
    const workerData = JSON.parse(process.argv[2]);

    const { package: pkg, env, variant, region, debug } = workerData;
    const options = {
        cwd: pkg.paths.packageFolder,
        env,
        variant,
        region,
        debug
    };

    const config = await requireConfigWithExecute(pkg.paths.webinyConfigFile, {
        options
    });

    const hasBuild = config.commands && typeof config.commands.build === "function";
    if (!hasBuild) {
        throw new Error("Build command not found.");
    }

    await config.commands.build(options);
} catch (error) {
    if (process.send) {
        process.send({ type: "error", error: serializeError(error) });
    }
    process.exit(1); // Ensure the worker process exits with an error code
}
