import { createImplementation } from "@webiny/di-container";
import { ProjectSdkParamsService } from "~/abstractions/index.js";

export class DefaultProjectSdkParamsService implements ProjectSdkParamsService.Interface {
    params: ProjectSdkParamsService.Params = {};

    get() {
        return this.params;
    }

    set(params: ProjectSdkParamsService.Params) {
        this.params = {
            ...this.params,
            ...params
        };
    }
}

export const projectSdkParamsService = createImplementation({
    abstraction: ProjectSdkParamsService,
    implementation: DefaultProjectSdkParamsService,
    dependencies: []
});
