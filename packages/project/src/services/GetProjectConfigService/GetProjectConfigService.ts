import { createImplementation } from "@webiny/di-container";
import {
    GetProjectConfigService,
    GetProjectService,
    LoggerService,
    ProjectSdkParamsService
} from "~/abstractions/index.js";
import { renderConfig } from "./renderConfig";
import { ProjectConfigModel } from "~/models/ProjectConfigModel";
import { ExtensionType, IHydratedProjectConfig, IProjectConfigDto } from "~/abstractions/models";
import { ExtensionInstanceModel } from "~/extensions";

export class DefaultGetProjectConfigService implements GetProjectConfigService.Interface {
    cachedProjectConfig: ProjectConfigModel | null = null;

    constructor(
        private readonly getProjectService: GetProjectService.Interface,
        private readonly projectSdkParamsService: ProjectSdkParamsService.Interface,
        private readonly loggerService: LoggerService.Interface
    ) {}

    async execute(
        params?: GetProjectConfigService.Params
    ): Promise<GetProjectConfigService.Result> {
        const project = await this.getProjectService.execute();

        const renderedConfig = await renderConfig(project.paths.manifestFile.absolute);
        const hydratedConfig = await this.hydrateConfig(renderedConfig, params);

        this.cachedProjectConfig = ProjectConfigModel.create(hydratedConfig);

        return this.cachedProjectConfig;
    }

    private async hydrateConfig(
        configDto: IProjectConfigDto,
        params?: GetProjectConfigService.Params
    ): Promise<IHydratedProjectConfig> {
        const projectSdkParams = this.projectSdkParamsService.get();
        const project = await this.getProjectService.execute();

        const tagsFilters = params?.tags || {};
        const extensionsTypes = Object.keys(configDto) as ExtensionType[];

        this.loggerService.trace(`Hydrating project config with the following parameters:`, {
            scopesFilter: tagsFilters,
            extensionsTypes,
            configDto
        });

        return extensionsTypes.reduce<IHydratedProjectConfig>(
            (acc, extensionType: ExtensionType) => {
                const oneOrMoreExtensions = configDto[extensionType];
                const extensionsArray = Array.isArray(oneOrMoreExtensions)
                    ? [...oneOrMoreExtensions]
                    : [oneOrMoreExtensions];

                const matchedExtensions = extensionsArray
                    .map(extensionParams => {
                        const extDef = projectSdkParams.extensions?.find(e => {
                            return e.type === extensionType;
                        });

                        if (!extDef) {
                            this.loggerService.warn(
                                `Could not find extension definition for type: ${extensionType}. Skipping...`
                            );
                            return null;
                        }

                        if (Object.keys(tagsFilters).length > 0) {
                            const extDefTags = extDef.tags;

                            const hasMatchingTags = Object.keys(tagsFilters).every(tag => {
                                const filterValue = tagsFilters[tag];
                                const extDefValue = extDefTags[tag];

                                // Otherwise, check for strict equality.
                                return extDefValue === filterValue;
                            });

                            if (!hasMatchingTags) {
                                return null;
                            }
                        }

                        return new ExtensionInstanceModel(extDef, extensionParams, { project });
                    })
                    .filter(Boolean) as ExtensionInstanceModel<any>[];

                if (matchedExtensions.length > 0) {
                    acc[extensionType] = matchedExtensions;
                }

                return acc;
            },
            {} as IHydratedProjectConfig
        );
    }
}

export const getProjectConfigService = createImplementation({
    abstraction: GetProjectConfigService,
    implementation: DefaultGetProjectConfigService,
    dependencies: [GetProjectService, ProjectSdkParamsService, LoggerService]
});
