import { createImplementation } from "@webiny/di-container";
import { GetProjectConfigService, GetProjectService } from "~/abstractions/index.js";
import { renderConfig } from "./renderConfig";
import { ProjectConfigModel } from "~/models/ProjectConfigModel";

export class DefaultGetProjectConfigService implements GetProjectConfigService.Interface
{
    cachedProjectConfig: ProjectConfigModel<any> | null = null;

    constructor(private readonly getProjectService: GetProjectService.Interface) {}

    async execute<TConfig extends Record<string, any> = Record<string, any>>() {
        const project = await this.getProjectService.execute();
        const renderedConfig = await renderConfig<TConfig>(project.paths.manifestFile.absolute);

        this.cachedProjectConfig = ProjectConfigModel.fromDto<TConfig>(renderedConfig);
        return this.cachedProjectConfig;
    }
}

export const getProjectConfigService = createImplementation({
    abstraction: GetProjectConfigService,
    implementation: DefaultGetProjectConfigService,
    dependencies: [GetProjectService]
});
