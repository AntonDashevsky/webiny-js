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
        { concurrent: false, rendererOptions: { showTimer: true, collapse: false } }
    );
    await runner.run();
}

export default {
    commands: {
        build: createBuildPackage({ cwd: __dirname }),
        watch: createWatchPackage({ cwd: __dirname }),
        buildHandlers
    }
};
