import path from "path";
import fs from "fs/promises";
import { transformFileAsync } from "@babel/core";
import chokidar from "chokidar";

const compileFile = async (cwd, inputPath, outputPath) => {
    const inputPathRelative = path.relative(cwd, inputPath);
    
    const result = await transformFileAsync(inputPath, {
        configFile: path.join(cwd, ".babelrc.js"),
        sourceMaps: true,
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

export default async (options) => {
    const srcDir = path.join(options.cwd, "src");
    const outDir = path.join(options.cwd, "dist");

    const watcher = chokidar.watch("**/*.{ts,tsx}", { cwd: srcDir });

    watcher.on("add", async (relativePath) => {
        const inputPath = path.join(srcDir, relativePath);
        const outputPath = path.join(outDir, relativePath.replace(/\.(ts|tsx)$/, ".js"));
        try {
            await compileFile(options.cwd, inputPath, outputPath);
        } catch (err) {
            console.error("Error compiling:", err);
        }
    });

    watcher.on("change", async (relativePath) => {
        const inputPath = path.join(srcDir, relativePath);
        const outputPath = path.join(outDir, relativePath.replace(/\.(ts|tsx)$/, ".js"));

        try {
            await compileFile(options.cwd, inputPath, outputPath);
        } catch (err) {
            console.error("Error compiling:", err);
        }
    });

    console.log("Watching for changes...");
};