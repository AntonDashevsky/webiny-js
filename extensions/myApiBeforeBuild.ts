import { createImplementation } from "@webiny/di-container";
import { ApiBeforeBuild, UiService } from "@webiny/extensions/project";

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
