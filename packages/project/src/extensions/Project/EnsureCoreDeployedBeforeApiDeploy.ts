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

        const coreAppName = "Core";
        const apiAppName = "API";
        const cmd = `yarn webiny deploy core --env ${env}${variantCmd}`;
        ui.error(`Cannot deploy the %s app before deploying %s.`, apiAppName, coreAppName);

        throw new GracefulError(
            [
                `Before deploying ${apiAppName} project application, please`,
                `deploy ${coreAppName} first by running: ${cmd}.`
            ].join(" ")
        );
    }
}

export default createImplementation({
    abstraction: ApiBeforeDeploy,
    implementation: EnsureCoreDeployedBeforeApiDeploy,
    dependencies: [UiService, GetAppStackOutput]
});
