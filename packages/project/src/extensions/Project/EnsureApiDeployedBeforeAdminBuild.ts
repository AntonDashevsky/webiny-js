import { createImplementation } from "@webiny/di-container";
import { AdminBeforeBuild, GetAppStackOutput, UiService } from "~/abstractions/index.js";
import { GracefulError } from "@webiny/project";

const NO_DEPLOYMENT_CHECKS_FLAG_NAME = "--no-deployment-checks";

class EnsureApiDeployedBeforeAdminBuild implements AdminBeforeBuild.Interface {
    constructor(
        private uiService: UiService.Interface,
        private getAppStackOutput: GetAppStackOutput.Interface
    ) {}

    async execute(params: AdminBeforeBuild.Params) {
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

        const cmd = `yarn webiny deploy api --env ${params.env}`;
        ui.error(`Cannot build the %s app before deploying %s.`, "Admin", "API");

        const message = [
            `Before building the Admin app, please`,
            `build API first by running: ${cmd}.`,
            `If you think this is a mistake, you can also try skipping`,
            `API deployment check by appending the ${NO_DEPLOYMENT_CHECKS_FLAG_NAME} flag.`,
            `Learn more: https://webiny.link/deployment-checks`
        ];

        throw new GracefulError(message.join(" "));
    }
}

export default createImplementation({
    abstraction: AdminBeforeBuild,
    implementation: EnsureApiDeployedBeforeAdminBuild,
    dependencies: [UiService, GetAppStackOutput]
});
