import glob from "fast-glob";
import path from "path";
import { Listr } from "listr2";
import { createWatchPackage, createBuildPackage } from "@webiny/project-utils";

const __dirname = import.meta.dirname;

async function buildHandlers(options) {
    if (process.env.WEBINY_SERVERLESS_CMS_AWS_SKIP_PREPUBLISH_ONLY === "true") {
        console.log("Skipping building of handlers...");
        return;
    }

    // Bundle all handlers. These are then used directly in real Webiny projects.
    const handlerPaths = glob.sync(`${__dirname}/handlers/**/webiny.config.js`);

    const runner = new Listr(
        [
            {
                title: "Build handlers for user projects",
                task(ctx, task) {
                    return task.newListr(
                        handlerPaths.map(handlerPath => {
                            return {
                                title: path.dirname(handlerPath).replace(__dirname, "."),
                                async task() {
                                    await require(handlerPath).commands.build({
                                        ...options,
                                        logs: false
                                    });
                                }
                            };
                        })
                    );
                }
            }
        ],
        { concurrent: true, rendererOptions: { showTimer: true, collapse: false } }
    );
    await runner.run();
}

export default {
    commands: {
        build: options => {
            // We're skipping library checking because `@rspack/core package` had internal
            // Typescript issues that we couldn't resolve. We'll revisit this later.
            // More info: https://github.com/web-infra-dev/rspack/issues/9154
            return createBuildPackage({ cwd: import.meta.dirname })({
                ...options,
                overrides: {
                    ...options.overrides,
                    tsConfig: { compilerOptions: { skipLibCheck: true } }
                }
            });
        },
        watch: createWatchPackage({ cwd: import.meta.dirname }),
        buildHandlers
    }
};
