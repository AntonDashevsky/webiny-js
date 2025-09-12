import path from "path";
import fs from "fs/promises";
import { transformFileAsync } from "@babel/core";
import chokidar from "chokidar";
import glob from "fast-glob";

const compileFile = async (cwd, inputPath, outputPath) => {
    const inputPathRelative = path.relative(cwd, inputPath);

    const result = await transformFileAsync(inputPath, {
        configFile: path.join(cwd, ".babelrc.js"),
        sourceMaps: true
    });

    if (!result || !result.code) {
        throw new Error(`Failed to compile: ${inputPath}`);
    }

    // Write compiled file
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, result.code);

    // Write source map
    if (result.map) {
        await fs.writeFile(`${outputPath}.map`, JSON.stringify(result.map));
    }

    console.log(`Successfully compiled ${inputPathRelative}.`);
};

const srcToDist = filePath =>
    path.join(
        filePath
            .replace(`${path.sep}src${path.sep}`, `${path.sep}dist${path.sep}`)
            .replace(/\.(ts|tsx)$/, ".js")
    );

export default async options => {
    const srcDir = path.join(options.cwd, "src");

    const filePaths = glob.sync("**/*.{ts,tsx}", { cwd: srcDir}).map(f => path.join(srcDir, f));

    const watcher = chokidar.watch(filePaths);

    watcher.on("add", async srcPath => {
        const distPath = srcToDist(srcPath);

        try {
            await compileFile(options.cwd, srcPath, distPath);
        } catch (err) {
            console.error("Error compiling:", err);
        }
    });

    watcher.on("change", async srcPath => {
        const distPath = srcToDist(srcPath);

        try {
            await compileFile(options.cwd, srcPath, distPath);
        } catch (err) {
            console.error("Error compiling:", err);
        }
    });

    console.log("Watching for changes...");
};
