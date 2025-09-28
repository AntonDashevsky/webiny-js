import { createImplementation } from "@webiny/di-container";
import { AdminBeforeWatch, GetAppStackOutput, UiService } from "~/abstractions/index.js";
import { GracefulError } from "@webiny/project";

const NO_DEPLOYMENT_CHECKS_FLAG_NAME = "--no-deployment-checks";

class EnsureApiDeployedBeforeAdminWatch implements AdminBeforeWatch.Interface {
    constructor(
        private uiService: UiService.Interface,
        private getAppStackOutput: GetAppStackOutput.Interface
    ) {}

    async execute(params: AdminBeforeWatch.Params) {
        // Just in case, we want to allow users to skip the system requirements check.
        if (params.deploymentChecks === false) {
            return;
        }

        const output = await this.getAppStackOutput.execute({ ...params, app: "api" });
        const apiDeployed = output && Object.keys(output).length > 0;
        if (apiDeployed) {
            return;
        }

        const ui = this.uiService;

        const apiAppName = "API";
        const adminAppName = "Admin";
        const cmd = `yarn webiny deploy api --env ${params.env}`;
        ui.error(`Cannot watch the %s app before deploying %s.`, adminAppName, apiAppName);

        const message = [
            `Before watching ${adminAppName} app, please`,
            `deploy ${apiAppName} first by running: ${cmd}.`,
            `If you think this is a mistake, you can also try skipping`,
            `the deployment checks by appending the ${NO_DEPLOYMENT_CHECKS_FLAG_NAME} flag.`,
            `Learn more: https://webiny.link/deployment-checks`
        ];

        throw new GracefulError(message.join(" "));
    }
}

export default createImplementation({
    abstraction: AdminBeforeWatch,
    implementation: EnsureApiDeployedBeforeAdminWatch,
    dependencies: [UiService, GetAppStackOutput]
});
