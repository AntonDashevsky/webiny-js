import { createImplementation } from "@webiny/di-container";
import {
    GetPulumiService,
    LoggerService,
    PulumiGetConfigPassphraseService,
    PulumiGetSecretsProviderService,
    PulumiLoginService,
    PulumiSelectStackService
} from "~/abstractions/index.js";
import { AppModel } from "~/models/index.js";
import { createEnvConfiguration, withPulumiConfigPassphrase } from "~/utils/env/index.js";
import { getStackName } from "~/utils/index.js";

export class DefaultPulumiSelectStackService implements PulumiSelectStackService.Interface {
    constructor(
        private getPulumiService: GetPulumiService.Interface,
        private pulumiLoginService: PulumiLoginService.Interface,
        private pulumiGetSecretsProviderService: PulumiGetSecretsProviderService.Interface,
        private pulumiGetConfigPassphraseService: PulumiGetConfigPassphraseService.Interface,
        private loggerService: LoggerService.Interface
    ) {}

    async execute(app: AppModel, params: PulumiSelectStackService.Params) {
        const pulumi = await this.getPulumiService.execute({ app });

        await this.pulumiLoginService.execute(app);

        const secretsProvider = this.pulumiGetSecretsProviderService.execute();
        const configPassphrase = this.pulumiGetConfigPassphraseService.execute();

        const stackName = getStackName(params);

        await pulumi.run({
            command: ["stack", "select", stackName],
            args: {
                create: true,
                secretsProvider
            },
            execa: {
                env: createEnvConfiguration({
                    configurations: [withPulumiConfigPassphrase(configPassphrase)]
                })
            }
        });

        /**
         * A region from the input or process CANNOT be different to the region from the stack.
         * Also, if there is no stack, everything is ok.
         */
        const region = params.region || process.env.AWS_REGION;

        const mustPerformCoreAppRegionMismatchCheck =
            this.mustPerformCoreAppRegionMismatchCheck(app);

        if (mustPerformCoreAppRegionMismatchCheck) {
            const coreStack = await this.getAppStackOutput(app, params);
            if (coreStack && coreStack.region && coreStack.region !== region) {
                throw new Error(
                    `Core App Region mismatch. Input: "${params.region || "none"}", process: "${
                        process.env.AWS_REGION || "none"
                    }". In Core stack: "${
                        coreStack.region
                    }". This can happen if you try to deploy a stack to a region different to the Core application region.`
                );
            }
        }

        const targetStack = await this.getAppStackOutput(app, params);

        if (!targetStack?.region || targetStack.region === region) {
            return;
        }

        throw new Error(
            `Region mismatch. Input: "${params.region || "none"}", process: "${
                process.env.AWS_REGION || "none"
            }". In stack: "${
                targetStack.region
            }". This can happen if you try to deploy a stack to a region other than it was initially deployed.`
        );
    }

    private mustPerformCoreAppRegionMismatchCheck(app: AppModel) {
        return app.name !== "core" && app.name !== "blueGreen";
    }

    private async getAppStackOutput(app: AppModel, params: PulumiSelectStackService.Params) {
        // We had to reimplement `getAppStackOutput` locally here. We could not use the existing
        // `PulumiGetStackOutputService` because, internally, it also depends on `PulumiSelectStackService`.
        // This would create a circular dependency. But also, this works just fine.
        const pulumi = await this.getPulumiService.execute({ app });
        const logger = this.loggerService;

        const stackOutputString = await pulumi.run({
            command: ["stack", "output"],
            args: {
                json: true
            },
            execa: {
                env: createEnvConfiguration({
                    configurations: [withPulumiConfigPassphrase()]
                })
            }
        });

        try {
            const stackOutputJson = JSON.parse(stackOutputString.stdout);
            if (!stackOutputJson) {
                return null;
            }

            return stackOutputJson;
        } catch {
            logger.error(
                "Could not parse stack output as JSON.",
                stackOutputString.stdout,
                app,
                params
            );
            return null;
        }
    }
}

export const pulumiSelectStackService = createImplementation({
    abstraction: PulumiSelectStackService,
    implementation: DefaultPulumiSelectStackService,
    dependencies: [
        GetPulumiService,
        PulumiLoginService,
        PulumiGetSecretsProviderService,
        PulumiGetConfigPassphraseService,
        LoggerService
    ]
});
