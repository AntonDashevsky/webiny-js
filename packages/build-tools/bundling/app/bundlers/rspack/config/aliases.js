import path from "path";
import fs from "fs";
import readJson from "read-json-sync";
import getWorkspaces from "get-yarn-workspaces";

const packages = getWorkspaces().map(pkg => pkg.replace(/\//g, path.sep));

export default packages.reduce((aliases, dir) => {
    try {
        const json = readJson(path.join(dir, "package.json"));
        if (fs.existsSync(path.join(dir, "dist"))) {
            aliases[`${json.name}`] = `${json.name}/dist`;
        }
    } catch (err) {
        // No package.json, continue.
    }
    return aliases;
}, {});
