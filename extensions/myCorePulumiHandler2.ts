import { createImplementation } from "@webiny/di-container";
import { CorePulumi, UiService } from "@webiny/extensions/project";

class MyCorePulumiHandler implements CorePulumi.Interface {
    constructor(private ui: UiService.Interface) {}

    execute({ env }: CorePulumi.Params) {
        this.ui.info("Executing MyCorePulumiHandler2 with environment:", env.name);
    }
}

export default createImplementation({
    abstraction: CorePulumi,
    implementation: MyCorePulumiHandler,
    dependencies: [UiService]
});
