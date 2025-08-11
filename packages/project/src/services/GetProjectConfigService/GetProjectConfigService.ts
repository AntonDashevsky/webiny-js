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
import { createWithValidationExtensionInstanceModel } from "./createWithValidationExtensionInstanceModel";
import { ExtensionInstanceModel } from "~/extensions";

export class DefaultGetProjectConfigService implements GetProjectConfigService.Interface {
    cachedProjectConfig: ProjectConfigModel | null = null;

    constructor(
        private readonly getProjectService: GetProjectService.Interface,
        private readonly projectSdkParamsService: ProjectSdkParamsService.Interface,
        private readonly loggerService: LoggerService.Interface
    ) {}

    async execute(params?: GetProjectConfigService.Params): Promise<ProjectConfigModel> {
        const project = await this.getProjectService.execute();

        const renderedConfig = await renderConfig(project.paths.manifestFile.absolute);

        const hydratedConfig = this.hydrateConfig(renderedConfig, params);

        this.cachedProjectConfig = ProjectConfigModel.create(hydratedConfig);
        return this.cachedProjectConfig;
    }

    private hydrateConfig(
        configDto: IProjectConfigDto,
        params?: GetProjectConfigService.Params
    ): IHydratedProjectConfig {
        const projectSdkParams = this.projectSdkParamsService.get();

        const scopesFilter = params?.scopes || [];
        const extensionsTypes = Object.keys(configDto) as ExtensionType[];

        this.loggerService.trace(
            `Hydrating project config with the following parameters:`,
            {
                scopesFilter,
                extensionsTypes,
                configDto
            }
        );

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

                        if (scopesFilter.length) {
                            const extDefScopes = extDef.scopes;

                            const hasMatchingScope = extDefScopes.some(scope =>
                                scopesFilter.includes(scope)
                            );

                            if (!hasMatchingScope) {
                                this.loggerService.debug(
                                    `Skipping extension of type "${extensionType}" with scope "${extensionParams.scope}" as it does not match the provided scopes filter.`
                                );
                                return null;
                            }
                        }

                        const WithValidationExtensionInstanceModel =
                            createWithValidationExtensionInstanceModel(projectSdkParams);

                        return new WithValidationExtensionInstanceModel(extDef, extensionParams);
                    })
                    .filter(Boolean) as ExtensionInstanceModel[];

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
