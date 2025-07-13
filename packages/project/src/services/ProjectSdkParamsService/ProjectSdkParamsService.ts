import { createImplementation } from "@webiny/di-container";
import { ProjectSdkParamsService } from "~/abstractions/index.js";
import { definitions as builtInExtensionDefinitions } from "~/extensions/index.js";

export class DefaultProjectSdkParamsService implements ProjectSdkParamsService.Interface {
    params: ProjectSdkParamsService.Params;

    constructor() {
        this.params = { cwd: "", extensions: builtInExtensionDefinitions };
    }

    get() {
        return this.params;
    }

    set(params: ProjectSdkParamsService.Params) {
        this.params = {
            extensions: [...builtInExtensionDefinitions, ...(params.extensions || [])],
            cwd: params.cwd || ''
        };
    }
}

export const projectSdkParamsService = createImplementation({
    abstraction: ProjectSdkParamsService,
    implementation: DefaultProjectSdkParamsService,
    dependencies: []
});
