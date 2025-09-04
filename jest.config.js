import "tsx";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import * as dotenv from "dotenv";

const { blueBright } = chalk;

function sanitizeEsIndexName(name) {
    if (!name) {
        return undefined;
    }

    if ("GITHUB_RUN_ID" in process.env) {
        return `${process.env["GITHUB_RUN_ID"]}_${name}_`;
    }

    return name;
}

const createPackageJestConfigPath = pkg => {
    const jestConfigPath = path.join(pkg, "jest.config.js");
    if (!fs.existsSync(jestConfigPath)) {
        return null;
    }
    return jestConfigPath;
};

const createPackageJestSetupPath = pkg => {
    const setupPath = path.join(pkg, "jest.setup.js");
    if (!fs.existsSync(setupPath)) {
        return null;
    }
    return setupPath;
};

const hasPackageJestConfig = pkg => {
    return !!createPackageJestConfigPath(pkg);
};

const importConfig = async configPath => {
    return import(configPath)
        .then(m => m.default ?? m)
        .then(config => {
            if (typeof config === "function") {
                return config();
            }
            return config;
        });
};

const getPackageJestSetup = async pkg => {
    const setupPath = createPackageJestSetupPath(pkg);
    if (!setupPath) {
        return null;
    }
    return await importConfig(setupPath);
};

const getPackageMetaFromPackageJson = pkgJson => {
    return {
        packageName: pkgJson.getJson().name,
        packageRoot: path.dirname(pkgJson.getLocation())
    };
};

const getPackageMetaFromPath = async value => {
    const { PackageJson } = await import("@webiny/project/PackageJson.js");

    // The exact test file path usually happens when we run tests via IDE.
    const request = path.resolve(value);

    if (fs.existsSync(request)) {
        const pkgJson = await PackageJson.findClosest(request);
        const stat = fs.lstatSync(request);

        const testMatch = stat.isFile() ? [request] : [`${request}/**/*.test.[jt]s?(x)`];

        return { ...getPackageMetaFromPackageJson(pkgJson), testMatch };
    }

    // `yarn test api-headless-cms`
    if (!value.includes(".") && !value.includes("/")) {
        // Means we're testing a package from `packages` folder.
        const request = path.resolve("packages", value);
        const pkgJson = await PackageJson.findClosest(request);

        return {
            ...getPackageMetaFromPackageJson(pkgJson),
            testMatch: [`${request}/**/*.test.[jt]s?(x)`]
        };
    }

    // For all other use cases, we simply assume it's a relative path from project root.
    //E.g., packages/validation, scripts/cjsToEsm
    const pkgJson = await PackageJson.findClosest(request);
    return {
        ...getPackageMetaFromPackageJson(pkgJson),
        testMatch: [`${request}/**/*.test.[jt]s?(x)`]
    };
};

const getPackageMeta = async () => {
    const argv = process.argv;
    // This parameter is used by Webstorm, when running a particular test file.
    const jestConfigJs = process.argv.findIndex(arg => arg === "jest.config.js");
    const runByPath = process.argv.findIndex(arg => arg === "--runTestsByPath");
    const isIntellij = process.argv.some(param => param.endsWith("jest-intellij-reporter.js"));

    if (jestConfigJs > -1) {
        return getPackageMetaFromPath(process.argv[jestConfigJs + 1]);
    }

    if (runByPath > -1) {
        // Find the package this test file belongs to.
        return getPackageMetaFromPath(process.argv[runByPath + 1]);
    }

    if (isIntellij) {
        const target = process.argv.find(param => param.includes("/packages/"));
        return getPackageMetaFromPath(target);
    }

    throw new Error(`Unable to parse package to test!`, argv.slice(1));
};

export default async () => {
    const argv = process.argv;
    // Sanitize ElasticsearchPrefix
    const esIndexPrefix = sanitizeEsIndexName(process.env.ELASTIC_SEARCH_INDEX_PREFIX);

    if (esIndexPrefix) {
        process.env.ELASTIC_SEARCH_INDEX_PREFIX = esIndexPrefix;
        process.stdout.write(`\nES index prefix: ${blueBright(esIndexPrefix)}\n\n`);
    }

    // Loads environment variables defined in the project root ".env" file.
    const { parsed } = dotenv.config({ path: path.join(import.meta.dirname, ".env") });
    if (parsed) {
        ["WCP_PROJECT_ID", "WCP_PROJECT_ENVIRONMENT", "WCP_PROJECT_LICENSE"].forEach(key => {
            delete parsed[key];
            delete process.env[key];
        });

        console.log('The following environment variables were included from the root ".env" file:');
        console.log(
            Object.keys(parsed).reduce((current, item) => {
                return current + `‣ ${item}\n`;
            }, "")
        );
    }

    const packageMeta = await getPackageMeta();

    const hasConfig = hasPackageJestConfig(packageMeta.packageRoot);
    const setup = await getPackageJestSetup(packageMeta.packageRoot);

    if (!hasConfig && !setup) {
        throw new Error(
            `${packageMeta.packageName} is missing a jest.config.js or a jest.setup.js file!`
        );
    }

    const project = hasConfig
        ? await importConfig(createPackageJestConfigPath(packageMeta.packageRoot))
        : setup;

    project.rootDir = process.cwd();
    project.testMatch = packageMeta.testMatch.map(match => {
        return match.replace(process.cwd(), "<rootDir>");
    });

    return {
        projects: [project],
        modulePathIgnorePatterns: ["dist"],
        testTimeout: 30000,
        watchman: false,
        workerIdleMemoryLimit: "512MB"
    };
};
