import { createImplementation } from "@webiny/di-container";
import { GetApp, GetAppStackExport, PulumiGetStackExportService } from "~/abstractions/index.js";

export class DefaultGetAppStackExport implements GetAppStackExport.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private pulumiGetStackExportService: PulumiGetStackExportService.Interface
    ) {}

    async execute<TExport extends Record<string, any> = Record<string, string>>(
        params: GetAppStackExport.Params
    ) {
        const app = await this.getApp.execute(params.app);
        return this.pulumiGetStackExportService.execute<TExport>(app, params);
    }
}

export const getAppStackExport = createImplementation({
    abstraction: GetAppStackExport,
    implementation: DefaultGetAppStackExport,
    dependencies: [GetApp, PulumiGetStackExportService]
});
