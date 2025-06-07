import { basename, join, dirname } from "path";
import fs from "fs";
import merge from "deepmerge";
import findUp from "find-up";
import { createJsWithTsEsmPreset } from "ts-jest";

export default async ({ path }, presets = []) => {
    const name = basename(path);

    const { PackageJson } = await import("@webiny/cli/utils/PackageJson.js");
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

    const tsEsmPreset = createJsWithTsEsmPreset({
        isolatedModules: true,
        diagnostics: false
    });

    const merged = merge.all([
        { setupFilesAfterEnv: [] },
        tsEsmPreset,
        {
            resolver: "ts-jest-resolver",
            displayName: name,
            modulePaths: [`${path}/src`],
            testMatch: [`${path}/**/*${type}.test.[jt]s?(x)`],
            transformIgnorePatterns: ["/node_modules/(?!(nanoid)/)"],
            moduleDirectories: ["node_modules"],
            moduleNameMapper: {
                "~tests/(.*)": `${path}/__tests__/$1`,
                "~/(.*)": `${path}/src/$1`
            },
            modulePathIgnorePatterns: [
                "<rootDir>/.verdaccio",
                "<rootDir>/.webiny",
                "<rootDir>/apps",
                "<rootDir>/packages/.*/dist"
            ],
            globals: {
                WEBINY_VERSION: version
            }
        }
    ]);

    merged.setupFiles = [
        ...(merged.setupFiles || []),
        ...presets
            .map(preset => preset.setupFiles)
            .flat()
            .filter(Boolean)
    ];

    const setupAfterEnv = join(path, "__tests__", "setup", "setupAfterEnv.js");
    const setupAfterEnvExists = fs.existsSync(setupAfterEnv);

    merged.setupFilesAfterEnv = [
        "jest-extended/all",
        join(import.meta.dirname, "jest.config.base.setup.js"),
        setupAfterEnvExists ? setupAfterEnv : null,
        ...merged.setupFilesAfterEnv,
        ...presets.map(preset => preset.setupFilesAfterEnv || []).flat()
    ].filter(Boolean);

    process.stdout.write(`Loading test setup files from the following packages:\n`);
    for (const setupFile of merged.setupFilesAfterEnv) {
        const filePkg = findUp.sync("package.json", { cwd: dirname(setupFile) });
        const pkg = await import(filePkg, { assert: { type: "json" } });
        if (pkg.name) {
            process.stdout.write(`- ${pkg.name}\n`);
        }
    }

    process.stdout.write(`\n---------------------------\n`);

    return merged;
};
