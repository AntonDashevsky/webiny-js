import fs from "fs";
import path from "path";
import crypto from "crypto";
import { AbstractStorageOps } from "../storageOps/AbstractStorageOps.js";

const getMd5Hash = (text: string) => {
    // Just convert the command to kebab-case.
    return crypto.createHash("md5").update(text).digest("hex");
};

class TestablePackage {
    private vitestCiConfig: Record<string, any> | null | undefined;

    constructor(private packageFolderPath: string) {}

    getId() {
        return getMd5Hash(this.packageFolderPath);
    }

    getName() {
        return path.basename(this.packageFolderPath);
    }

    getTestCommands() {
        const vitestCiConfig = this.getVitestCiConfig();
        const shardsCount = vitestCiConfig?.sharding?.shardsCount;
        if (shardsCount && Number.isInteger(shardsCount) && shardsCount > 1) {
            const commands = [];
            for (let currentShard = 1; currentShard <= shardsCount; currentShard++) {
                const cmd = `yarn test ${this.packageFolderPath} --shard=${currentShard}/${shardsCount}`;
                const title = `${this.getName()} (${currentShard}/${shardsCount})`;
                commands.push({ id: getMd5Hash(cmd), title, cmd });
            }
            return commands;
        }

        const title = this.getName();
        const cmd = `yarn test ${this.packageFolderPath}`;
        return [{ id: getMd5Hash(cmd), title, cmd }];
    }

    hasTests() {
        const hasConfig =
            fs.existsSync(path.join(this.packageFolderPath, "vitest.config.ts")) ||
            fs.existsSync(path.join(this.packageFolderPath, "vitest.setup.ts"));

        if (!hasConfig) {
            return false;
        }

        return this.packageFolderContainsTestFile(this.packageFolderPath);
    }

    testingEnabled() {
        const vitestCiConfig = this.getVitestCiConfig();
        return !vitestCiConfig || vitestCiConfig.enabled !== false;
    }

    testedWithoutStorageOps() {
        const vitestCiConfig = this.getVitestCiConfig();
        return !vitestCiConfig || !vitestCiConfig.storageOps;
    }

    testedWithStorageOps(storageOps: AbstractStorageOps) {
        const vitestCiConfig = this.getVitestCiConfig();
        if (!vitestCiConfig) {
            return false;
        }

        const { storageOps: configStorageOps } = vitestCiConfig;
        return Array.isArray(configStorageOps) && configStorageOps.includes(storageOps.id);
    }

    getVitestCiConfig() {
        if (this.vitestCiConfig !== undefined) {
            return this.vitestCiConfig;
        }

        this.vitestCiConfig = null;
        const ciConfigJsonFilePath = path.join(this.packageFolderPath, "ci.config.json");
        if (fs.existsSync(ciConfigJsonFilePath)) {
            const { vitest } = JSON.parse(fs.readFileSync(ciConfigJsonFilePath, "utf8"));
            if (vitest) {
                this.vitestCiConfig = vitest;
            }
        }
        return this.vitestCiConfig;
    }

    private packageFolderContainsTestFile(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                if (this.packageFolderContainsTestFile(fullPath)) {
                    return true;
                }
            } else if (entry.isFile() && entry.name.endsWith(".test.ts")) {
                return true;
            }
        }

        return false;
    }
}

export const listVitestPackages = (storageOps?: AbstractStorageOps) => {
    return fs
        .readdirSync("packages")
        .filter(name => !name.startsWith("."))
        .map(name => {
            const packageFolderPath = path.join("packages", name);
            return new TestablePackage(packageFolderPath);
        })
        .filter(pkg => pkg.testingEnabled() && pkg.hasTests())
        .filter(pkg => {
            if (storageOps) {
                return pkg.testedWithStorageOps(storageOps);
            }

            return pkg.testedWithoutStorageOps();
        });
};
