import fs from "fs-extra";
import { Package } from "./types";
import { getBuildOutputFolder } from "./getBuildOutputFolder";
import { CACHE_FOLDER_PATH } from "./constants";
import { fork } from "child_process";
import path from "path";

export const buildPackage = async (pkg: Package, buildOverrides = "{}") => {
    const workerPath = path.join(import.meta.dirname, "buildPackageWorker.js");
    const childProcess = fork(workerPath, [buildOverrides], {
        env: process.env,
        cwd: pkg.packageFolder,
        stdio: ["pipe", "pipe", "pipe", "ipc"]
    });

    await new Promise<void>((resolve, reject) => {
        childProcess.on("message", (message: Record<string, any>) => {
            console.log("WWAAAAA");
            if (message.error) {
                reject(
                    new Error(message.error.message || "Unknown error occurred in build process")
                );
            }
        });

        childProcess.on("exit", code => {
            if (code !== 0) {
                reject(new Error(`Build process exited with code ${code}`));
            }
            // If the process exits successfully, we resolve the promise.
            resolve();
        });
    });

    // Copy and paste built code into the cache folder.
    const cacheFolderPath = path.join(CACHE_FOLDER_PATH, pkg.packageJson.name);

    const buildFolder = getBuildOutputFolder(pkg);

    // Delete previous cache!
    await fs.emptyDir(cacheFolderPath);
    await fs.copy(buildFolder, cacheFolderPath);
};
