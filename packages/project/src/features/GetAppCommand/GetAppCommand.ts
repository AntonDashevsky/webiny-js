import { createImplementation } from "@webiny/di-container";
import { GetAppCommand, GetAppService } from "~/abstractions";

export class DefaultGetAppCommand implements GetAppCommand.Interface {
    constructor(private getAppService: GetAppService.Interface) {}

    async execute(params: GetAppCommand.Params) {
        return this.getAppService.execute(params.project, params.appName);
    }
}

export const getAppCommand = createImplementation({
    abstraction: GetAppCommand,
    implementation: DefaultGetAppCommand,
    dependencies: [GetAppService]
});
