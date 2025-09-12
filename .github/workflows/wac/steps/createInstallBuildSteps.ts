import { withCommonParams } from "./withCommonParams.js";

interface CreateInstallBuildStepsParams {
    workingDirectory: string;
}

export const createInstallBuildSteps = (params: CreateInstallBuildStepsParams) => {
    return withCommonParams(
        [
            { name: "Install dependencies", run: "yarn --immutable" },
            { name: "Build packages", run: "yarn build:quick" }
        ],
        { "working-directory": params.workingDirectory }
    );
};
