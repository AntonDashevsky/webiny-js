import { Pulumi } from "@webiny/pulumi-sdk";
import { ProjectModel } from "~/models";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName,
    withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env/index.js";
import { DeployAppService } from "~/abstractions";

export const executePreview = async (
    pulumi: Pulumi,
    project: ProjectModel,
    params: DeployAppService.Params
) => {
    const config = createEnvConfiguration({
        configurations: [
            withRegion(params),
            withEnv(params),
            withEnvVariant(params),
            withProjectName({ project }),
            withPulumiConfigPassphrase()
        ]
    });

    return pulumi.run({
        command: "preview",
        args: {
            diff: true,
            debug: !!params.debug
            // Preview command does not accept "--secrets-provider" argument.
            // secretsProvider: PULUMI_SECRETS_PROVIDER
        },
        execa: {
            env: config
        }
    });
};
