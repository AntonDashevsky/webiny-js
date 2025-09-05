import { basename, join } from "path";
import fs from "fs";
import type { ViteUserConfig } from "vitest/config";

type Alias = Extract<NonNullable<ViteUserConfig["test"]>["alias"], { find: any }>;

type TestPreset = {
    setupFiles?: string[];
    setupFilesAfterEnv?: string[];
};

type CreateTestConfigParams = {
    path: string;
    presets?: TestPreset[];
    vitestConfig?: ViteUserConfig["test"];
};

export const createTestConfig = async ({
    path,
    presets = [],
    vitestConfig = {}
}: CreateTestConfigParams): Promise<NonNullable<ViteUserConfig["test"]>> => {
    const name = basename(path);

    const { PackageJson } = await import("@webiny/project-utils/utils/PackageJson.js");
    const cliPackage = await PackageJson.fromPackage("@webiny/cli");
    const version = cliPackage.getJson().version;

    process.env.DB_TABLE = "DynamoDB";
    process.env.DB_TABLE_ELASTICSEARCH = "ElasticsearchStream";
    process.env.DB_TABLE_LOG = "DynamoDBLog";
    process.env.WEBINY_VERSION = version;
    process.env.WEBINY_ELASTICSEARCH_INDEX_LOCALE = "true";

    // Enables us to run tests of only a specific type (for example "integration" or "e2e").
    let type = "";
    if (process.env.TEST_TYPE) {
        type = `.${process.env.TEST_TYPE}`;
    }

    process.env.JEST_DYNALITE_CONFIG_DIRECTORY = path;

    const project: ViteUserConfig["test"] = {
        name: name,
        include: [`${path}/**/*${type}.test.[jt]s?(x)`],
        dir: path,
        ...vitestConfig,
        css: false,
        alias: [
            {
                find: /^~tests(.*)/,
                replacement: `${path}/__tests__$1`
            },
            { find: /^~(.*)/, replacement: `${path}/src$1` },
            ...((vitestConfig.alias ?? []) as Alias)
        ]
    };

    const setupAfterEnv = join(path, "__tests__", "setup", "setupAfterEnv.js");
    const setupAfterEnvExists = fs.existsSync(setupAfterEnv);

    project.setupFiles = [
        ...presets.map(preset => preset.setupFiles || []),
        ...presets.map(preset => preset.setupFilesAfterEnv || []),
        setupAfterEnvExists ? setupAfterEnv : undefined
    ]
        .flat()
        .filter(Boolean) as string[];

    process.stdout.write(`\n---------------------------\n`);

    return project;
};
