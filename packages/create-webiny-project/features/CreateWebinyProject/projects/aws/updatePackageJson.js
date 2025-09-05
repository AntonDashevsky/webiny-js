import path from "path";
import loadJsonFile from "load-json-file";
import merge from "lodash/merge.js";
import writeJsonFile from "write-json-file";

export const updatePackageJson = cwp => {
    const { projectRootFolder: projectRootPath } = cwp.params.paths;

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
