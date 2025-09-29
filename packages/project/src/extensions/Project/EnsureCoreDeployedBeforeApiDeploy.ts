import { createImplementation } from "@webiny/di-container";
import { ApiBeforeDeploy, GetAppStackOutput, UiService } from "~/abstractions/index.js";
import { GracefulError } from "@webiny/project";

class EnsureCoreDeployedBeforeApiDeploy implements ApiBeforeDeploy.Interface {
    constructor(
        private uiService: UiService.Interface,
        private getAppStackOutput: GetAppStackOutput.Interface
    ) {}

    async execute(params: ApiBeforeDeploy.Params) {
        const output = await this.getAppStackOutput.execute({ ...params, app: "core" });

        const coreDeployed = output && Object.keys(output).length > 0;
        if (coreDeployed) {
            return;
        }

        const { variant, env } = params;

        let variantCmd = "";
        if (variant) {
            variantCmd = ` --variant ${variant}`;
        }

        const ui = this.uiService;

        ui.error(`Cannot deploy %s before deploying %s.`, "API", "Core");

        const message = [`Before deploying %s, please`, `deploy %s first by running: %s.`].join(
            " "
        );

        const cmd = `yarn webiny deploy core --env ${env}${variantCmd}`;
        throw GracefulError.from(message, "API", "Core", cmd);
    }
}

export default createImplementation({
    abstraction: ApiBeforeDeploy,
    implementation: EnsureCoreDeployedBeforeApiDeploy,
    dependencies: [UiService, GetAppStackOutput]
});
