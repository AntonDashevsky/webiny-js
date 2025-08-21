import { createImplementation } from "@webiny/di-container";
import {
    GetApp,
    ListAppLambdaFunctionsService,
    ListPackagesService,
    LoggerService,
    Watch
} from "~/abstractions/index.js";
import chalk from "chalk";
// import get from "lodash/get.js";
// import merge from "lodash/merge.js";
// import type inspectorType from "inspector";
// import { getDeploymentId, loadEnvVariables, runHook, setMustRefreshBeforeDeploy } from "~/utils/index.js";
// import { getIotEndpoint } from "./getIotEndpoint.js";
import { AppModel } from "~/models/index.js";
import { PackagesWatcher } from "./watchers/PackagesWatcher.js";
// import { initInvocationForwarding } from "./initInvocationForwarding.js";
// import { replaceLambdaFunctions } from "./replaceLambdaFunctions.js";

// Do not allow watching "prod" and "production" environments. On the Pulumi CLI side, the command
// is still in preview mode, so it's definitely not wise to use it on production environments.
const WATCH_DISABLED_ENVIRONMENTS = ["prod", "production"];

export class DefaultWatch implements Watch.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private logger: LoggerService.Interface,
        private listAppLambdaFunctionsService: ListAppLambdaFunctionsService.Interface,
        private listPackagesService: ListPackagesService.Interface
    ) {}

    async execute(params: Watch.Params) {
        const hasAppOrPackage = "app" in params || "package" in params;
        if (!hasAppOrPackage) {
            throw new Error(
                `Either "app" or "package" arguments must be passed. Cannot have both undefined.`
            );
        }

        // If we're not watching a specific app, we can only watch packages.
        if (!("app" in params)) {
            const packages = await this.listPackagesService.execute({
                whitelist: params.package,
            });
            const packagesWatcher = new PackagesWatcher({ packages, params, logger: this.logger });

            return packagesWatcher.watch();
        }

        // Get project application metadata. Will throw an error if an invalid folder is specified.
        const app = await this.getApp.execute(params.app);

        // If exists - read default params from "webiny.application.ts" file.
        // params = merge({}, get(app, "config.cli.watch"), params);
        if (!app) {
            throw new Error(
                `Invalid app name "${params.app}". Please specify a valid app name (core, api, or admin).`
            );
        }

        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        if (WATCH_DISABLED_ENVIRONMENTS.includes(params.env)) {
            if (!params.allowProduction) {
                throw new Error(
                    `${chalk.red(
                        "webiny watch"
                    )} command cannot be used with production environments.`
                );
            }
        }

        // A maximum of 15 minutes in seconds can be passed.
        if (params.increaseTimeout && params.increaseTimeout > 900) {
            throw new Error(
                `When increasing the timeout, the maximum value that can be passed is 900 seconds (15 minutes).`
            );
        }

        const packages = await this.listPackagesService.execute(params);
        const packagesWatcher = new PackagesWatcher({ packages, params, logger: this.logger });

        const functionsList = await this.listAppLambdaFunctionsService.execute(app, params);

        const deployCommand = `yarn webiny deploy ${app.name} --env ${params.env}`;
        const learnMoreLink = "https://webiny.link/local-aws-lambda-development";
        const troubleshootingLink = learnMoreLink + "#troubleshooting";

        if (functionsList.meta.count === 0) {
            // If functions exist, but none are selected for watching, show a warning.
            if (functionsList.meta.totalCount > 0) {
                this.logger.info(
                    [
                        "No AWS Lambda functions will be invoked locally. If this is unexpected, you can try the following:",
                        " ‣ stop the current development session",
                        " ‣ redeploy the %s application by running %s command",
                        " ‣ start a new %s session by rerunning %s command",
                        "",
                        "Learn more: %s"
                    ].join("\n"),
                    app.name,
                    deployCommand,
                    "webiny watch",
                    "webiny watch",
                    troubleshootingLink
                );
            }

            return packagesWatcher.watch();
        }

        return []
        //
        // context.info(`Local AWS Lambda development session started.`);
        // context.warning(
        //     `Note that once the session is terminated, the %s application will no longer work. To fix this, you %s redeploy it via the %s command. Learn more: %s.`,
        //     app.name,
        //     "MUST",
        //     deployCommand,
        //     learnMoreLink
        // );
        //
        // context.debug(
        //     "The events for following AWS Lambda functions will be forwarded locally: ",
        //     functionsList.list.map(fn => fn.name)
        // );
        //
        // // console.log();
        // // const { default: exitHook } = await import(/!* webpackChunkName: "exit-hook" *!/
        // // "exit-hook";)
        // // ;
        //
        // exitHook(() => {
        //     console.log();
        //     console.log();
        //
        //     context.info(`Terminating local AWS Lambda development session.`);
        //     context.warning(
        //         `Note that once the session is terminated, the %s application will no longer work. To fix this, you %s redeploy it via the %s command. Learn more: %s.`,
        //         app?.name,
        //         "MUST",
        //         deployCommand,
        //         learnMoreLink
        //     );
        // });
        //
        // const deploymentId = getDeploymentId({
        //     env: params.env,
        //     variant: params.variant
        // });
        // const iotEndpointTopic = `webiny-watch-${deploymentId}`;
        // const iotEndpoint = await getIotEndpoint({
        //     env: params.env,
        //     variant: params.variant
        // });
        // const sessionId = new Date().getTime();
        // const increaseTimeout = params.increaseTimeout;
        // const localExecutionHandshakeTimeout = params.increaseHandshakeTimeout || 5; // Default to 5 seconds.
        //
        // // We want to ensure a Pulumi refresh is made before the next deploy.
        // setMustRefreshBeforeDeploy(context);
        //
        // // Ignore promise, we don't need to wait for this to finish.
        // replaceLambdaFunctions({
        //     context,
        //     env: params.env,
        //     folder: params.folder,
        //     variant: params.variant,
        //
        //     iotEndpoint,
        //     iotEndpointTopic,
        //     sessionId,
        //     functionsList,
        //     increaseTimeout,
        //     localExecutionHandshakeTimeout
        // });
        //
        // let inspector: typeof inspectorType | undefined = undefined;
        // if (params.inspect) {
        //     inspector = require("inspector");
        //     inspector!.open(9229, "127.0.0.1");
        //     console.log();
        //
        //     exitHook(() => {
        //         inspector!.close();
        //     });
        // }
        //
        // // Ignore promise, we don't need to wait for this to finish.
        // initInvocationForwarding({
        //     iotEndpoint,
        //     iotEndpointTopic,
        //     functionsList,
        //     sessionId
        // });
        //
        // await packagesWatcher.watch();
    }
}

export const watch = createImplementation({
    abstraction: Watch,
    implementation: DefaultWatch,
    dependencies: [
        GetApp,
        LoggerService,
        ListAppLambdaFunctionsService,
        ListPackagesService
    ]
});
