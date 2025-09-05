import loadJsonFile from "load-json-file";
import writeJsonFile from "write-json-file";
import { GetCwpVersion } from "./GetCwpVersion.js";
import { GetProjectRootPath } from "./GetProjectRootPath.js";
import { CliParams } from "../types.js";
import path from "path";

export class SetWebinyPackageVersions {
    async execute(cliArgs: CliParams) {
        const getProjectRootPath = new GetProjectRootPath();
        const projectRootPath = getProjectRootPath.execute(cliArgs);

        const getCwpVersion = new GetCwpVersion();
        const cwpVersion = await getCwpVersion.execute();

        const projectPackageJsonPath = path.join(projectRootPath, "package.json");
        const projectPackageJson = loadJsonFile.sync<Record<string, any>>(projectPackageJsonPath);

        for (const dependency in projectPackageJson.dependencies) {
            if (dependency.startsWith("@webiny/")) {
                projectPackageJson.dependencies[dependency] = cwpVersion;
            }
        }

        for (const dependency in projectPackageJson.devDependencies) {
            if (dependency.startsWith("@webiny/")) {
                projectPackageJson.devDependencies[dependency] = cwpVersion;
            }
        }

        writeJsonFile.sync(projectPackageJsonPath, projectPackageJson);
    }
}
