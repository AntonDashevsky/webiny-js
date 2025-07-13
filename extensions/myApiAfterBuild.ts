import { createImplementation } from "@webiny/di-container";
import { ApiAfterBuild, UiService } from "@webiny/extensions/project";

class MyApiAfterBuild implements ApiAfterBuild.Interface {
    constructor(private ui: UiService.Interface) {}

    execute(params: ApiAfterBuild.Params) {
        this.ui.info("This is my custom after build API implementation.");
    }
}

export default createImplementation({
    abstraction: ApiAfterBuild,
    implementation: MyApiAfterBuild,
    dependencies: [UiService]
});
