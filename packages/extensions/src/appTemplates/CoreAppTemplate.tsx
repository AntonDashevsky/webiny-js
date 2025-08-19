import { createDecorator } from "@webiny/di-container";
import { CoreBeforeBuild, UiService } from "@webiny/extensions/project";

class MyCoreBeforeBuild implements CoreBeforeBuild.Interface {
    constructor(private ui: UiService.Interface) {}

    execute(params: CoreBeforeBuild.Params) {
        this.ui.info("This is my custom before build CORE implementation.");
    }
}

export default createDecorator({
    abstraction: CoreBeforeBuild,
    implementation: MyCoreBeforeBuild,
    dependencies: [UiService]
});
