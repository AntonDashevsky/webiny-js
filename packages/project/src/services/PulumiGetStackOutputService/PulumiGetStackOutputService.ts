import { createImplementation } from "@webiny/di-container";
import { GetPulumiService, PulumiGetStackOutputService } from "~/abstractions";
import { AppModel } from "~/models";
import { getStackName } from "~/utils";
import { createEnvConfiguration, withPulumiConfigPassphrase } from "~/utils/env";
import { mapStackOutput } from "./mapStackOutput";

export class DefaultPulumiGetStackOutputService implements PulumiGetStackOutputService.Interface {
    constructor(private getPulumiService: GetPulumiService.Interface) {}

    async execute(app: AppModel, params: PulumiGetStackOutputService.Params): Promise<any> {
        const pulumi = await this.getPulumiService.execute({ app });

        const { env, variant } = params;

        const stackName = getStackName({ env, variant });

        let stackExists = true;
        try {
            const PULUMI_SECRETS_PROVIDER = process.env.PULUMI_SECRETS_PROVIDER;

            await pulumi.run({
                command: ["stack", "select", `${stackName}`],
                args: {
                    secretsProvider: PULUMI_SECRETS_PROVIDER
                },
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
                stdio: "inherit"
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
    dependencies: [GetPulumiService]
});
