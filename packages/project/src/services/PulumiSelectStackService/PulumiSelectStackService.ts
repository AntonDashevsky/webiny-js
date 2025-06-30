import { createImplementation } from "@webiny/di-container";
import {
    GetPulumiService,
    PulumiSelectStackService,
    PulumiLoginService,
    PulumiGetStackOutputService,
    PulumiGetSecretsProviderService,
    PulumiGetConfigPassphraseService
} from "~/abstractions";
import { AppModel } from "~/models";
import { createEnvConfiguration, withPulumiConfigPassphrase } from "~/utils/env";
import { getStackName } from "~/utils";

export class DefaultPulumiSelectStackService implements PulumiSelectStackService.Interface {
    constructor(
        private getPulumiService: GetPulumiService.Interface,
        private pulumiLoginService: PulumiLoginService.Interface,
        private pulumiGetStackOutputService: PulumiGetStackOutputService.Interface,
        private pulumiGetSecretsProviderService: PulumiGetSecretsProviderService.Interface,
        private pulumiGetConfigPassphraseService: PulumiGetConfigPassphraseService.Interface
    ) {}

    async execute(app: AppModel, params: PulumiSelectStackService.Params): Promise<any> {
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

        const skip = ["core", "blueGreen"].includes(app.name);

        if (!skip) {
            const coreStack = await this.pulumiGetStackOutputService.execute(app, params);
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

        const targetStack = await this.pulumiGetStackOutputService.execute(app, params);

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
}

export const pulumiSelectStackService = createImplementation({
    abstraction: PulumiSelectStackService,
    implementation: DefaultPulumiSelectStackService,
    dependencies: [
        GetPulumiService,
        PulumiLoginService,
        PulumiGetStackOutputService,
        PulumiGetSecretsProviderService,
        PulumiGetConfigPassphraseService
    ]
});
