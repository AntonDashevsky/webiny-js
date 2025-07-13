import { createImplementation } from "@webiny/di-container";
import { UiService } from "@webiny/cli-core/abstractions/index.js";
import { ApiBeforeDeploy } from "@webiny/project/abstractions/index.js";

class MyApiBeforeDeploy implements ApiBeforeDeploy.Interface {
    constructor(private ui: UiService.Interface) {}

    execute(params: ApiBeforeDeploy.Params) {
        this.ui.info("This is my custom before deploy API implementation.");
    }
}

export default createImplementation({
    abstraction: ApiBeforeDeploy,
    implementation: MyApiBeforeDeploy,
    dependencies: [UiService]
});
