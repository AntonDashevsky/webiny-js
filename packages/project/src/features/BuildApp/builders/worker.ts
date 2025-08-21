import { serializeError } from "serialize-error";
import { requireConfigWithExecute } from "./utils/requireConfig.js";

const worker = async () => {
    const workerData = {
        _: ["deploy"],
        env: "dev",
        "deployment-logs": true,
        deploymentLogs: true,
        debug: true,
        build: true,
        preview: false,
        $0: "webiny",
        app: "admin",
        variant: undefined,
        region: undefined,
        package: {
            paths: {
                packageFolder: "/Users/adrian/dev/wby-v6/.webiny/workspaces/apps/admin",
                webinyConfigFile:
                    "/Users/adrian/dev/wby-v6/.webiny/workspaces/apps/admin/webiny.config.ts"
            }
        }
    };

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
