import { createImplementation } from "@webiny/di-container";
import { GetApp, GetAppService } from "~/abstractions";

export class DefaultGetApp implements GetApp.Interface {
    constructor(private getAppService: GetAppService.Interface) {}

    async execute(params: GetApp.Params) {
        return this.getAppService.execute(params.project, params.appName);
    }
}

export const getApp = createImplementation({
    abstraction: GetApp,
    implementation: DefaultGetApp,
    dependencies: [GetAppService]
});
