import fs from "fs";
import path from "path";
import getYarnWorkspaces from "get-yarn-workspaces";
export { linkWorkspaces } from "./linkWorkspaces";

const hasPackageJson = p => fs.existsSync(p + "/package.json");

export const allWorkspaces = () => {
    return getYarnWorkspaces()
        .filter(hasPackageJson)
        .map(pkg => pkg.replace(/\//g, path.sep));
};
