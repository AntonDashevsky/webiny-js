import { ProjectSdk } from "./ProjectSdk.js";
import { GetAppStackOutput } from "~/abstractions/index.js";

// A temporary convenience function to get the stack output for a specific app. We should probably revisit this in the future and think of a better way to do this.
const getStackOutput = async <
    TOutput extends GetAppStackOutput.StackOutput = GetAppStackOutput.StackOutput
>(
    params: GetAppStackOutput.Params
) => {
    const sdk = await ProjectSdk.init();
    return sdk.getAppStackOutput<TOutput>(params);
};

export { ProjectSdk, getStackOutput };
