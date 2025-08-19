import { createImplementation } from "@webiny/di-container";
import { CorePulumi, UiService } from "@webiny/extensions/project";

class MyCorePulumiHandler implements CorePulumi.Interface {
    constructor(private ui: UiService.Interface) {}

    execute() {
        this.ui.info("Executing MyCorePulumiHandler with environment:");
    }
}

export default createImplementation({
    abstraction: CorePulumi,
    implementation: MyCorePulumiHandler,
    dependencies: [UiService]
});
