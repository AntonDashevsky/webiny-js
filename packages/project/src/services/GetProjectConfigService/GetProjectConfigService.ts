import { createImplementation } from "@webiny/di-container";
import {
    GetProjectConfigService,
    GetProjectService,
    ProjectSdkParamsService
} from "~/abstractions/index.js";
import { renderConfig } from "./renderConfig";
import { ProjectConfigModel } from "~/models/ProjectConfigModel";
import { ExtensionType, IHydratedProjectConfig, IProjectConfigDto } from "~/abstractions/models";
import { createWithValidationExtensionInstanceModel } from "./createWithValidationExtensionInstanceModel";

export class DefaultGetProjectConfigService implements GetProjectConfigService.Interface {
    cachedProjectConfig: ProjectConfigModel | null = null;

    constructor(
        private readonly getProjectService: GetProjectService.Interface,
        private readonly projectSdkParamsService: ProjectSdkParamsService.Interface
    ) {}

    async execute() {
        const project = await this.getProjectService.execute();

        const renderedConfig = await renderConfig(project.paths.manifestFile.absolute);
        const hydratedConfig = this.hydrateConfig(renderedConfig);

        this.cachedProjectConfig = ProjectConfigModel.create(hydratedConfig);
        return this.cachedProjectConfig;
    }

    private hydrateConfig(configDto: IProjectConfigDto): IHydratedProjectConfig {
        const projectSdkParams = this.projectSdkParamsService.get();

        const extensionsTypes = Object.keys(configDto) as ExtensionType[];
        return extensionsTypes.reduce<IHydratedProjectConfig>(
            (acc, extensionType: ExtensionType) => {
                acc[extensionType] = configDto[extensionType]
                    .map(extensionParams => {
                        const extDef = projectSdkParams.extensions?.find(e => {
                            return e.type === extensionType;
                        });

                        if (!extDef) {
                            throw new Error(
                                "Could not find extension definition for type: " + extensionType
                            );
                        }

                        const WithValidationExtensionInstanceModel =
                            createWithValidationExtensionInstanceModel(projectSdkParams);

                        return new WithValidationExtensionInstanceModel(extDef, extensionParams);
                    })
                    .filter(Boolean);

                return acc;
            },
            {}
        );
    }
}

export const getProjectConfigService = createImplementation({
    abstraction: GetProjectConfigService,
    implementation: DefaultGetProjectConfigService,
    dependencies: [GetProjectService, ProjectSdkParamsService]
});
