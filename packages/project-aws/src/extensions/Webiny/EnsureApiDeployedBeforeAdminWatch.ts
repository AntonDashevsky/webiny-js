import { createImplementation } from "@webiny/di-container";
import {
    ApiBeforeDeploy,
    GetAppStackOutput,
    UiService
} from "@webiny/project/abstractions/index.js";
import { GracefulError } from "@webiny/project";

const NO_DEPLOYMENT_CHECKS_FLAG_NAME = "--no-deployment-checks";

class EnsureCoreDeployed implements ApiBeforeDeploy.Interface {
    constructor(
        private uiService: UiService.Interface,
        private getAppStackOutput: GetAppStackOutput.Interface
    ) {}

    async execute(params: ApiBeforeDeploy.Params) {
        // Just in case, we want to allow users to skip the system requirements check.
        // if (params.deploymentChecks === false) {
        //     return;
        // }

        const output = this.getAppStackOutput.execute({ ...params, app: "api" });
        const apiDeployed = output && Object.keys(output).length > 0;
        if (apiDeployed) {
            return;
        }

        const ui = this.uiService;

        const apiAppName = "API";
        const adminAppName = "Admin";
        const cmd = `yarn webiny deploy api --env ${params.env}`;
        ui.error(`Cannot watch ${adminAppName} app before deploying ${apiAppName}.`);

        const message = [
            `Before watching ${adminAppName} app, please`,
            `deploy ${apiAppName} first by running: ${cmd}.`,
            `If you think this is a mistake, you can also try skipping`,
            `the deployment checks by appending the ${NO_DEPLOYMENT_CHECKS_FLAG_NAME} flag.`,
            `Learn more: https://webiny.link/deploy-api-first`
        ];

        throw new GracefulError(message.join(" "));
    }
}

export default createImplementation({
    abstraction: ApiBeforeDeploy,
    implementation: EnsureCoreDeployed,
    dependencies: [UiService, GetAppStackOutput]
});
