import { createImplementation } from "@webiny/di-container";
import { UiService } from "@webiny/cli-core/abstractions/index.js";
import { ApiBeforeBuild } from "@webiny/project/abstractions/index.js";

class MyApiBeforeBuild implements ApiBeforeBuild.Interface {
    constructor(private ui: UiService.Interface) {}

    execute(params: ApiBeforeBuild.Params) {
        this.ui.info("This is my custom before build API implementation.");
    }
}

export default createImplementation({
    abstraction: ApiBeforeBuild,
    implementation: MyApiBeforeBuild,
    dependencies: [UiService]
});
