import { serializeError } from "serialize-error";
import { requireConfigWithExecute } from "./utils/requireConfig.js"

const worker = async () => {
    // Since this is executed in a separate process, we need to initialize the project.
    const workerData = JSON.parse(process.argv[2]);
    const { package: pkg, env, variant, region, debug } = workerData;
    const options = {
        cwd: pkg.paths.root,
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
    await config.commands.build(options).catch(error => {
        // Send error message to the parent process
        if (process.send) {
            process.send(serializeError(error));
        }
        process.exit(1); // Ensure the worker process exits with an error code
    });
};

(async () => {
    await worker();
})();
