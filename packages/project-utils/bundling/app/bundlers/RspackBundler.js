const fs = require("fs-extra");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const { BaseAppBundler } = require("./BaseAppBundler");
const { createRspackConfig } = require("./rspack/createRspackConfig");
const rspack = require("@rspack/core");
const { getProjectApplication } = require("@webiny/cli/utils");
const path = require("path");
const TailwindSuppressor = require("./rspack/TailwindSuppressor");

class RspackBundler extends BaseAppBundler {
    constructor(params) {
        super();
        this.params = params;
        this.tailwindSuppressor = new TailwindSuppressor();
    }

    build() {
        this.tailwindSuppressor.enable();
        process.env.NODE_ENV = "production";

        return new Promise(async (resolve, reject) => {
            const rspackConfig = this.getRspackConfig("production");

            const compiler = rspack(rspackConfig);

            return compiler.run(async (err, stats) => {
                this.tailwindSuppressor.disable();

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

                // Merge with the public folder
                copyPublicFolder(this.getPaths());

                resolve();
            });
        });
    }

    async watch() {
        this.tailwindSuppressor.enable();

        if (!("REACT_APP_DEBUG" in process.env)) {
            process.env.REACT_APP_DEBUG = "true";
        }

        process.env.NODE_ENV = "development";
        process.env.ESLINT_NO_UNUSED_VARS = "0";

        const rspackConfig = this.getRspackConfig("development");
        const RspackDevServer = require("./rspack/RspackDevServer");

        const compiler = rspack(rspackConfig);

        const devServer = new RspackDevServer(compiler, { paths: this.getPaths() });

        await devServer.start();
    }

    getPaths() {
        const { cwd, overrides } = this.params;

        const appIndexJs = overrides.entry || path.resolve(cwd, "src", "index.tsx");

        return require("./webpack/config/paths")({ appIndexJs, cwd });
    }

    getRspackConfig(env) {
        const paths = this.getPaths();

        let projectApplication;
        try {
            projectApplication = getProjectApplication({ cwd: this.params.cwd });
        } catch {
            // No need to do anything.
        }

        return createRspackConfig(paths, {
            ...this.params,
            projectApplication,
            env
        });
    }
}

function copyPublicFolder(paths) {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml
    });
}

module.exports = { RspackBundler };
