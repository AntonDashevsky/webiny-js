import { Pulumi } from "@webiny/pulumi-sdk";
import path from "path";
import { createImplementation } from "@webiny/di-container";
import { GetProjectService, GetPulumiService } from "~/abstractions";

export class DefaultGetPulumiService implements GetPulumiService.Interface {
    constructor(private readonly getProjectService: GetProjectService.Interface) {}

    async execute(params: GetPulumiService.Params = {}) {
        const project = this.getProjectService.execute();
        const { app, pulumiOptions = {} } = params;


        let cwd;
        if (app) {
            cwd = app.paths.workspaceFolder.absolute;
        }

        return Pulumi.create({
            ...pulumiOptions,
            execa: { ...pulumiOptions.execa, cwd },
            pulumiFolder: path.join(project.paths.rootFolder.absolute, ".webiny"),
        });
    }
}

export const getPulumiService = createImplementation({
    abstraction: GetPulumiService,
    implementation: DefaultGetPulumiService,
    dependencies: [GetProjectService]
});
