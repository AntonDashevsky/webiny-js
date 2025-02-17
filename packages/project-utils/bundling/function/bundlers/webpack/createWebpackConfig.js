import path from "path";
import webpack from "webpack";
import WebpackBar from "webpackbar";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import packageJson from "@webiny/project-utils/package.json" assert { type: "json" };
import { getOutput, getEntry } from "../../utils.js";
import { createResolve } from "../../../resolve.js";

const resolve = createResolve(import.meta.url);

export const createWebpackConfig = async options => {
    const output = getOutput(options);
    const entry = getEntry(options);

    const { cwd, overrides, production } = options;

    let babelOptions = await import("./babelrc").then(m => m.default ?? m);
    // Customize Babel options.
    if (typeof overrides.babel === "function") {
        babelOptions = overrides.babel(babelOptions);
    }

    const sourceMaps = options.sourceMaps !== false;

    const definitions = overrides.define ? JSON.parse(overrides.define) : {};
    const tsChecksEnabled = process.env.WEBINY_ENABLE_TS_CHECKS === "true";

    return {
        entry: [sourceMaps && resolve("source-map-support/register"), path.resolve(entry)].filter(
            Boolean
        ),
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
        optimization: {
            minimize: production
        },
        performance: {
            // Turn off size warnings for entry points
            hints: false
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.WEBINY_VERSION": JSON.stringify(
                    process.env.WEBINY_VERSION || packageJson.version
                ),
                ...definitions
            }),
            /**
             * This is necessary to enable JSDOM usage in Lambda.
             */
            new webpack.IgnorePlugin({
                resourceRegExp: /canvas/,
                contextRegExp: /jsdom$/
            }),
            tsChecksEnabled &&
                new ForkTsCheckerWebpackPlugin({
                    typescript: {
                        configFile: path.resolve(cwd, "./tsconfig.json"),
                        typescriptPath: resolve("typescript")
                    },
                    async: !production
                }),
            new WebpackBar({ name: path.basename(cwd) })
        ].filter(Boolean),
        // Run babel on all .js files and skip those in node_modules
        module: {
            exprContextCritical: false,
            rules: [
                {
                    oneOf: [
                        sourceMaps && {
                            test: /\.js$/,
                            enforce: "pre",
                            use: [resolve("source-map-loader")]
                        },
                        {
                            test: /\.mjs$/,
                            include: /node_modules/,
                            type: "javascript/auto",
                            resolve: {
                                fullySpecified: false
                            }
                        },
                        {
                            test: /\.(js|ts)$/,
                            loader: resolve("babel-loader"),
                            exclude: /node_modules/,
                            options: babelOptions
                        }
                    ].filter(Boolean)
                },
                /**
                 * Some NPM libraries import CSS automatically, and that breaks the build.
                 * To eliminate the problem, we use the `null-loader` to ignore CSS.
                 */
                {
                    test: /\.css$/,
                    loader: resolve("null-loader")
                }
            ]
        },
        resolve: {
            alias: {
                // Force `lexical` to use the CJS export.
                lexical: resolve("lexical")
            },
            modules: [path.resolve(path.join(cwd, "node_modules")), "node_modules"],
            extensions: [".ts", ".mjs", ".js", ".json", ".css"]
        }
    };
};
