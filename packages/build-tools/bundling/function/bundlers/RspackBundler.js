import rspack from "@rspack/core";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { BaseFunctionBundler } from "./BaseFunctionBundler.js";
import { createRspackConfig } from "./rspack/createRspackConfig.js";

export class RspackBundler extends BaseFunctionBundler {
    constructor(params) {
        super();
        this.params = params;
    }

    build() {
        return new Promise(async (resolve, reject) => {
            const rspackConfig = await createRspackConfig({
                ...this.params,
                production: true
            });

            const compiler = rspack(rspackConfig);

            return compiler.run(async (err, stats) => {
                let messages = {};

                if (err) {
                    messages = formatWebpackMessages({
                        errors: [err.message],
                        warnings: []
                    });

                    const errorMessages = messages.errors.join("\n\n");
                    console.error(errorMessages);
                    return reject(new Error(errorMessages));
                }

                if (stats.hasErrors()) {
                    messages = formatWebpackMessages(
                        stats.toJson({
                            all: false,
                            warnings: true,
                            errors: true
                        })
                    );
                }

                if (Array.isArray(messages.errors) && messages.errors.length) {
                    // Only keep the first error. Others are often indicative
                    // of the same problem, but confuse the reader with noise.
                    if (messages.errors.length > 1) {
                        messages.errors.length = 1;
                    }

                    const errorMessages = messages.errors.join("\n\n");
                    console.error(errorMessages);
                    reject(new Error(errorMessages));
                    return;
                }

                console.log("Compiled successfully.");
                resolve();
            });
        });
    }

    watch() {
        return new Promise(async (_, reject) => {
            const rspackConfig = await createRspackConfig({
                ...this.params,
                production: false
            });

            console.log("Compiling...");

            const compiler = rspack(rspackConfig);

            return compiler.watch({}, async (err, stats) => {
                if (err) {
                    return reject(err);
                }

                if (!stats.hasErrors()) {
                    console.log("Compiled successfully.");
                } else {
                    console.log(stats.toString("errors-warnings"));
                }
            });
        });
    }
}
