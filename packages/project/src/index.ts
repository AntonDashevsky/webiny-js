import { ProjectSdk } from "./ProjectSdk.js";
import { type GetAppStackOutput } from "~/abstractions/index.js";

export const getProjectSdk = (...params: Parameters<(typeof ProjectSdk)["init"]>) => {
    return ProjectSdk.init(...params);
};

// A temporary convenience function to get the stack output for a specific app. We might revisit this in the
// future and double check if there's a better way to expose this functionality.
const getStackOutput = async <
    TOutput extends GetAppStackOutput.StackOutput = GetAppStackOutput.StackOutput
>(
    params: GetAppStackOutput.Params
) => {
    const sdk = await getProjectSdk();
    return sdk.getAppStackOutput<TOutput>(params);
};

export { ProjectSdk, getStackOutput };

export type { AppName } from "./abstractions/types.js";
export type * from "./abstractions/models/index.js";

export type { IStackOutput } from "~/abstractions/features/GetAppStackOutput.js";

export { PackageJson } from "./utils/PackageJson.js";
