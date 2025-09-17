import fs from "fs-extra";
import { Package } from "./types";
import { getBuildOutputFolder } from "./getBuildOutputFolder";
import { CACHE_FOLDER_PATH } from "./constants";
import { fork } from "child_process";
import path from "path";
import { deserializeError } from "serialize-error";

export const buildPackage = async (pkg: Package, buildOverrides = "{}") => {
    const workerPath = path.join(import.meta.dirname, "buildPackageWorker.js");
    const childProcess = fork(workerPath, [buildOverrides], {
        env: process.env,
        cwd: pkg.packageFolder,
        stdio: ["pipe", "pipe", "pipe", "ipc"]
    });

    await new Promise<void>((resolve, reject) => {
        childProcess.on("message", (message: Record<string, any>) => {
            if (message.type === "error") {
                const error = deserializeError(message.error);
                return reject(error);
            }

            return resolve();
        });
    });

    // Copy and paste built code into the cache folder.
    const cacheFolderPath = path.join(CACHE_FOLDER_PATH, pkg.packageJson.name);

    const buildFolder = getBuildOutputFolder(pkg);

    // Delete previous cache!
    await fs.emptyDir(cacheFolderPath);
    await fs.copy(buildFolder, cacheFolderPath);
};
