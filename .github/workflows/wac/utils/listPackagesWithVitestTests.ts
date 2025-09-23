/**
 * Defines how package tests are executed. This script enables parallel execution of Vitest tests.
 *
 * WARNING: do not use any 3rd party libraries because we need this script to be executed in
 * our CI/CD, as fast as possible. Using 3rd party libraries would require `yarn install`
 * to be run before this script is executed.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { StorageOps } from "../types.ts";

const TEST_FILE_REGEX = /test\.j?t?sx?$/;

const cmdToId = (cmd: string) => {
    // Just convert the command to kebab-case.
    return crypto.createHash("md5").update(cmd).digest("hex");
};

interface PackageWithTests {
    id: string;
    name: string;
}

export const listPackagesWithVitestTests = (storageOps?: StorageOps) => {
    const allPackages = fs.readdirSync("packages").filter(name => !name.startsWith("."));

    const packagesWithTests: PackageWithTests[] = [];

    for (let i = 0; i < allPackages.length; i++) {
        const packageName = allPackages[i];

        // Paths.
        const packageFolderPath = path.join("packages", packageName);
        const ciConfigJsonFilePath = path.join(packageFolderPath, "ci.config.json");

        let extraVitestArgs: Record<string, any> = {};
        if (fs.existsSync(ciConfigJsonFilePath)) {
            const ciConfig = JSON.parse(fs.readFileSync(ciConfigJsonFilePath, "utf8"));

            if (ciConfig && ciConfig.vitest) {
                extraVitestArgs = ciConfig.vitest;
            }
        }

        if (extraVitestArgs.enabled === false) {
            continue;
        }

        if (Array.isArray(extraVitestArgs.storageOps)) {
            if (extraVitestArgs.storageOps.includes(storageOps)) {
                packagesWithTests.push({
                    id: cmdToId(packageName + storageOps),
                    name: packageName
                });
                continue;
            }
        }

        if (hasTestFiles(packageFolderPath)) {
            packagesWithTests.push({
                id: cmdToId(packageName + storageOps),
                name: packageName
            });
        }
    }

    return packagesWithTests;
};

function hasTestFiles(packageFolderPath: string) {
    if (!fs.existsSync(packageFolderPath)) {
        return false;
    }

    const files = fs.readdirSync(packageFolderPath);
    for (const filename of files) {
        const filepath = path.join(packageFolderPath, filename);
        if (fs.statSync(filepath).isDirectory()) {
            const hasTFiles = hasTestFiles(filepath);
            if (hasTFiles) {
                return true;
            }
        } else if (TEST_FILE_REGEX.test(filepath)) {
            return true;
        }
    }
    return false;
}

// Takes a PackageWithTests object and returns an array of commands, where each
// command is just running a subset of tests. This is achieved by using the
// Jest's `--shard` option.
// const shardPackageTestExecution = (pkg: PackageWithTests, shardsCount = 6) => {
//     const commands: PackageWithTests[] = [];
//     for (let currentShard = 1; currentShard <= shardsCount; currentShard++) {
//         commands.push({ ...pkg, cmd: pkg.cmd + ` --shard=${currentShard}/${shardsCount}` });
//     }
//
//     return commands;
// };
