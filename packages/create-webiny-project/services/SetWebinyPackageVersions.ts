import loadJsonFile from "load-json-file";
import writeJsonFile from "write-json-file";
import { GetCwpVersion } from "./GetCwpVersion.js";

export class SetWebinyPackageVersions {
    async execute(packageJsonPath) {
        const getCwpVersion = new GetCwpVersion();
        const cwpVersion = await getCwpVersion.execute();

        const projectPackageJson = loadJsonFile.sync(packageJsonPath);

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
