import { createImplementation } from "@webiny/di-container";
import { GetApp, GetAppOutput, PulumiGetStackOutputService } from "~/abstractions";

export class DefaultGetAppOutput implements GetAppOutput.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private pulumiGetStackOutputService: PulumiGetStackOutputService.Interface
    ) {}

    async execute<TOutput extends Record<string, any> = Record<string, any>>(
        params: GetAppOutput.Params
    ) {
        const app = await this.getApp.execute(params.app);

        return this.pulumiGetStackOutputService.execute<TOutput>(app, params);
    }
}

export const getAppOutput = createImplementation({
    abstraction: GetAppOutput,
    implementation: DefaultGetAppOutput,
    dependencies: [GetApp, PulumiGetStackOutputService]
});
