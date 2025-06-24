import { createImplementation } from "@webiny/di-container";
import { GetAppService, GetProjectService } from "~/abstractions";
import { AppModel } from "~/services/GetAppService/models/AppModel";

export class DefaultGetAppService implements GetAppService.Interface {
    execute(appName: string) {
        return new AppModel(appName);
    }
}

export const getAppService = createImplementation({
    abstraction: GetAppService,
    implementation: DefaultGetAppService,
    dependencies: [GetProjectService]
});
