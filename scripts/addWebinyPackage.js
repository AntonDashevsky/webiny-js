#!/usr/bin/env node
import writeJson from "write-json-file";
import chalk from "chalk";
import path from "path";
import { getPackages } from "./utils/getPackages.js";

const { cyan, green, gray } = chalk;
const { join, relative } = path;

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).parse();

/**
 * This is a small tool that adds Webiny package as a dependency to another Webiny package.
 * Besides updating the package.json, this tool will also update relevant TS configs.
 *
 * The following line will add "@webiny-i18n" and "@webiny-security" as dependencies of "@webiny/api-i18n-content":
 * yarn add-webiny-package @webiny/api-i18n-content @webiny-i18n @webiny-security
 */

const [targetPackageName, ...dependencyPackageNames] = argv._;
let targetPackage;
const dependencyPackages = [];

const packages = getPackages();
for (let i = 0; i < packages.length; i++) {
    let pckg = packages[i];
    if (pckg.packageJson.name === targetPackageName) {
        targetPackage = pckg;
    } else if (dependencyPackageNames.includes(pckg.packageJson.name)) {
        dependencyPackages.push(pckg);
    }
}

for (let i = 0; i < dependencyPackages.length; i++) {
    let depPackage = dependencyPackages[i];
    const depPackageRelativePath = relative(
        targetPackage.packageFolder,
        join(depPackage.packageFolder)
    ).replace(/\\/g, "/");

    targetPackage.packageJson.dependencies[
        depPackage.packageJson.name
    ] = `${depPackage.packageJson.version}`;

    if (targetPackage.tsConfigJson) {
        {
            const exists = targetPackage.tsConfigJson.references.find(
                item => item.path === depPackageRelativePath
            );
            !exists && targetPackage.tsConfigJson.references.push({ path: depPackageRelativePath });
        }

        {
            targetPackage.tsConfigJson.compilerOptions.paths = {
                ...(targetPackage.tsConfigJson.compilerOptions.paths || {}),
                [`${depPackage.name}/*`]: [`../${depPackage.name}/src/*`],
                [`${depPackage.name}`]: [`../${depPackage.name}/src`]
            };
        }
    }

    if (targetPackage.tsConfigBuildJson) {
        const path = join(depPackageRelativePath, "tsconfig.build.json").replace(/\\/g, "/");

        const exists = targetPackage.tsConfigBuildJson.references.find(item => item.path === path);
        !exists && targetPackage.tsConfigBuildJson.references.push({ path });
    }
}

console.log(cyan(`Updating ("${targetPackage.packageJson.name}") package dependencies...`));

await writeJson(targetPackage.packageJsonPath, targetPackage.packageJson);
console.log(`${green("✔ package.json")} updated ${gray(`(${targetPackage.packageJsonPath})`)}`);

if (targetPackage.tsConfigJson) {
    await writeJson(targetPackage.tsConfigJsonPath, targetPackage.tsConfigJson);
    console.log(
        `${green("✔ tsconfig.json")} updated ${gray(`(${targetPackage.tsConfigJsonPath})`)}`
    );
}

if (targetPackage.tsConfigBuildJson) {
    await writeJson(targetPackage.tsConfigBuildJsonPath, targetPackage.tsConfigBuildJson);
    console.log(
        `${green("✔ tsconfig.build.json")} updated ${gray(
            `(${targetPackage.tsConfigBuildJsonPath})`
        )}`
    );
}

process.exit(0);
