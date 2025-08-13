import fs from "fs";
import webpack from "webpack";
import postcss from "postcss";
import postcssImport from "postcss-import";

const buildThemeCss = async (entry: string) => {
    // Read CSS entry file.
    const raw = fs.readFileSync(entry, "utf8");

    // Inline local imports.
    const result = await postcss([postcssImport()]).process(raw, { from: entry });

    return result.css;
}

export const injectThemeCss = async (entry: string, variableName?: string) => {
    const defineKey = variableName ?? "__THEME_CSS__";

    const initialCss = await buildThemeCss(entry);

    // Inject as a global constant available in your app.
    const definePlugin = new webpack.DefinePlugin({ [defineKey]: JSON.stringify(initialCss) });

    const plugins: webpack.WebpackPluginInstance[] = [definePlugin];

    const getPlugins = (dev: boolean) => {

        if (dev) {
            // Watch for changes and update plugin definitions
            plugins.push({
                apply(compiler) {
                    compiler.hooks.afterCompile.tapPromise("WatchThemeCss", async (compilation) => {
                        compilation.fileDependencies.add(entry);
                    });

                    compiler.hooks.beforeCompile.tapPromise("UpdateThemeCss", async () => {
                        const cssValue = await buildThemeCss(entry);
                        // Update the definitions on our specific plugin
                        definePlugin.definitions[defineKey] = JSON.stringify(cssValue);
                    });
                },
            })
        }

        return plugins;
    }

    return { getPlugins };


}
