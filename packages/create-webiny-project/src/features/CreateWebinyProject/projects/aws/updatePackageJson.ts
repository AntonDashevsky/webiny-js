import path from "path";
import loadJsonFile from "load-json-file";
import merge from "lodash/merge.js";
import writeJsonFile from "write-json-file";
import { CliParams } from "../../../../types.js";
import { GetProjectRootPath } from "../../../../services/index.js";

export const updatePackageJson = (cliArgs: CliParams) => {
    const getProjectRoot = new GetProjectRootPath();
    const projectRootPath = getProjectRoot.execute(cliArgs);

    const packageJsonPath = path.join(projectRootPath, "package.json");
    const packageJson = loadJsonFile.sync(packageJsonPath);

    merge(packageJson, {
        keywords: ["aws+dynamodb"],
        dependencies: {
            "@webiny/project-aws": "latest",
            "@webiny/extensions": "latest"
        }
    });

    writeJsonFile.sync(packageJsonPath, packageJson);
};
