import path from "path";
import rspack, { ProgressPlugin } from "@rspack/core";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";
import { getAppName } from "./getAppName.js";

export const createWbyCfgRspackConfig = params => {
    const cwd = process.cwd();
    let swcConfig = {
        jsc: {
            parser: {
                syntax: "typescript",
                tsx: true,
                jsx: true
            },
            baseUrl: cwd
        },
        module: {
            type: "commonjs"
        }
    };

    const production = true;
    const watch = true;
    const entry = process.cwd() + "/webiny.config.tsx";

    console.log("entryyyy", entry);

    /** @type {import("@rspack/core").Configuration} */
    return {
        watch,
        // entry: [
        //     sourceMaps && import.meta.resolve("source-map-support/register"),
        //     path.resolve(entry)
        // ].filter(Boolean),
        entry: [entry],
        target: "node",
        output: {
            libraryTarget: "commonjs",
            path: "whatevs",
            filename: "whatevs.js",
            chunkFilename: `[name].[contenthash:8].chunk.js`
        },
        devtool: false,
        mode: production ? "production" : "development",
        performance: {
            // Turn off size warnings for entry points
            hints: false
        },
        plugins: [
            // new TsCheckerRspackPlugin(),

            // This is necessary to enable JSDOM usage in Lambda.
            // https://rspack.dev/plugins/webpack/ignore-plugin
            new rspack.IgnorePlugin({
                resourceRegExp: /canvas/,
                contextRegExp: /jsdom$/
            })

            // https://rspack.dev/plugins/webpack/progress-plugin
            // new ProgressPlugin({ prefix: "webiny.config.tsx" })
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
                }
            ]
        },
        resolve: {
            modules: [path.resolve(path.join(cwd, "node_modules")), "node_modules"],
            extensions: [".ts", ".mjs", ".js", ".tsx", ".jsx", ".json"]
        }
    };
};
