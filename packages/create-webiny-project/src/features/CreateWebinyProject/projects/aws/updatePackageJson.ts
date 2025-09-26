import path from "path";
import loadJsonFile from "load-json-file";
import writeJsonFile from "write-json-file";
import { CliParams } from "../../../../types.js";
import { GetProjectRootPath } from "../../../../services/index.js";

export const updatePackageJson = (cliArgs: CliParams) => {
    const getProjectRoot = new GetProjectRootPath();
    const projectRootPath = getProjectRoot.execute(cliArgs);

    const packageJsonPath = path.join(projectRootPath, "package.json");
    const packageJson = loadJsonFile.sync<any>(packageJsonPath);

    packageJson.dependencies = {
        ...packageJson.dependencies,
        "@webiny/project-aws": "latest",
        "@webiny/extensions": "latest"
    };

    writeJsonFile.sync(packageJsonPath, packageJson);
};
