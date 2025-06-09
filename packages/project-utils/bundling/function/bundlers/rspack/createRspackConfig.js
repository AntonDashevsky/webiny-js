import path from "path";
import rspack from "@rspack/core";
import packageJson from "@webiny/project-utils/package.json" with { type: "json" };
import { getOutput, getEntry } from "../../utils.js";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";
import { createSwcConfig } from "./createSwcConfig.js";

export const createRspackConfig = async params => {
    const output = getOutput(params);
    const entry = getEntry(params);

    const { cwd, overrides, production, watch } = params;

    let swcConfig = createSwcConfig(cwd);

    // User overrides.
    if (typeof overrides.swc === "function") {
        swcConfig = overrides.swc(swcConfig);
    }

    const sourceMaps = params.sourceMaps !== false;

    const definitions = overrides.define ? JSON.parse(overrides.define) : {};
    const tsChecksEnabled = process.env.WEBINY_ENABLE_TS_CHECKS === "true";

    /** @type {import('@rspack/core').Configuration} */
    let rspackConfig = {
        watch,
        entry: [
            sourceMaps && import.meta.resolve("source-map-support/register"),
            path.resolve(entry)
        ].filter(Boolean),
        target: "node",
        output: {
            libraryTarget: "commonjs",
            path: output.path,
            filename: output.filename,
            chunkFilename: `[name].[contenthash:8].chunk.js`
        },
        devtool: sourceMaps ? "source-map" : false,
        externals: [/^@aws-sdk/, /^sharp$/],
        mode: production ? "production" : "development",
        performance: {
            // Turn off size warnings for entry points
            hints: false
        },
        plugins: [
            tsChecksEnabled && new TsCheckerRspackPlugin(),

            // https://rspack.dev/plugins/webpack/define-plugin
            new rspack.DefinePlugin({
                "process.env.WEBINY_VERSION": JSON.stringify(
                    process.env.WEBINY_VERSION || packageJson.version
                ),
                ...definitions
            }),

            // This is necessary to enable JSDOM usage in Lambda.
            // https://rspack.dev/plugins/webpack/ignore-plugin
            new rspack.IgnorePlugin({
                resourceRegExp: /canvas/,
                contextRegExp: /jsdom$/
            }),

            // https://rspack.dev/plugins/webpack/progress-plugin
            new rspack.ProgressPlugin()
        ].filter(Boolean),

        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.mjs$/,
                            include: /node_modules/,
                            type: "javascript/auto",
                            resolve: {
                                fullySpecified: false
                            }
                        },
                        {
                            test: /\.(ts)$/,
                            loader: "builtin:swc-loader",
                            exclude: /node_modules/,
                            options: swcConfig
                        }
                    ].filter(Boolean)
                },
                /**
                 * Some NPM libraries import CSS automatically, and that breaks the build.
                 * To eliminate the problem, we use the `null-loader` to ignore CSS.
                 */
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: path.resolve(import.meta.dirname, "nullLoader.js")
                        }
                    ]
                }
            ]
        },
        resolve: {
            modules: [path.resolve(path.join(cwd, "node_modules")), "node_modules"],
            extensions: [".ts", ".mjs", ".js", ".json", ".css"]
        }
    };

    // User overrides.
    if (typeof overrides.rspack === "function") {
        rspackConfig = overrides.rspack(rspackConfig);
    }

    return rspackConfig;
};
