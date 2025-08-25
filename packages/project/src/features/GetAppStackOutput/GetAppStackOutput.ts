import { createImplementation } from "@webiny/di-container";
import { GetApp, GetAppStackOutput, PulumiGetStackOutputService } from "~/abstractions/index.js";

export class DefaultGetAppStackOutput implements GetAppStackOutput.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private pulumiGetStackOutputService: PulumiGetStackOutputService.Interface
    ) {}

    async execute<TOutput extends GetAppStackOutput.StackOutput = GetAppStackOutput.StackOutput>(
        params: GetAppStackOutput.Params
    ) {
        const app = this.getApp.execute(params.app);
        return this.pulumiGetStackOutputService.execute<TOutput>(app, params);
    }
}

export const getAppStackOutput = createImplementation({
    abstraction: GetAppStackOutput,
    implementation: DefaultGetAppStackOutput,
    dependencies: [GetApp, PulumiGetStackOutputService]
});
