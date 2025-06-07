import fs from "fs";
import path from "path";

const defaultExclude = [
    "cli-plugin-dependencies",
    "cli-plugin-deploy-pulumi",
    "cli-plugin-extensions",
    "cli-plugin-scaffold-ci",
    "cli-plugin-scaffold-extensions",
    "cli-plugin-scaffold-workspaces",
    "cli-plugin-scaffold",
    "cli-plugin-workspaces",
    "cli",
    "create-webiny-project",
    "cwp-template-aws",
    "project-utils"
];

export const getPackages = (exclude: string[] = defaultExclude) => {
    return fs
        .readdirSync(process.cwd() + "/packages", { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !exclude.includes(dirent.name))
        .map(dirent => path.join(dirent.parentPath, dirent.name));
};
