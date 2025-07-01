import { createImplementation } from "@webiny/di-container";
import {
    GetPulumiService,
    PulumiGetSecretsProviderService,
    PulumiGetStackOutputService
} from "~/abstractions/index.js";
import { AppModel } from "~/models/index.js";
import { getStackName } from "~/utils/index.js";
import { createEnvConfiguration, withPulumiConfigPassphrase } from "~/utils/env/index.js";
import { mapStackOutput } from "./mapStackOutput.js";

export class DefaultPulumiGetStackOutputService implements PulumiGetStackOutputService.Interface {
    constructor(
        private getPulumiService: GetPulumiService.Interface,
        private pulumiGetSecretsProviderService: PulumiGetSecretsProviderService.Interface
    ) {}

    async execute(app: AppModel, params: PulumiGetStackOutputService.Params): Promise<any> {
        const pulumi = await this.getPulumiService.execute({ app });

        const { env, variant } = params;

        const stackName = getStackName({ env, variant });

        let stackExists = true;
        try {
            const secretsProvider = this.pulumiGetSecretsProviderService.execute();

            await pulumi.run({
                command: ["stack", "select", `${stackName}`],
                args: { secretsProvider },
                execa: {
                    env: createEnvConfiguration({
                        configurations: [withPulumiConfigPassphrase()]
                    })
                }
            });
        } catch (e) {
            stackExists = false;
        }

        if (!stackExists) {
            return null;
        }

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

            const map = params.map;
            if (!map) {
                return stackOutputJson;
            }

            // If a mapping is provided, we map the output to the specified structure.
            return mapStackOutput(stackOutputJson, map);
        } catch {
            return null;
        }
    }
}

export const pulumiGetStackOutputService = createImplementation({
    abstraction: PulumiGetStackOutputService,
    implementation: DefaultPulumiGetStackOutputService,
    dependencies: [GetPulumiService, PulumiGetSecretsProviderService]
});
