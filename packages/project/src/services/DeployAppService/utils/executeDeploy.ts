import { Pulumi } from "@webiny/pulumi-sdk";
import { DeployAppService } from "~/abstractions";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName,
    withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env/index.js";
import { ProjectModel } from "~/models";

export const executeDeploy = async (pulumi: Pulumi, project: ProjectModel, params: DeployAppService.Params) => {
    const PULUMI_SECRETS_PROVIDER = process.env.PULUMI_SECRETS_PROVIDER;

    return pulumi.run({
        command: "up",
        args: {
            yes: true,
            skipPreview: true,
            secretsProvider: PULUMI_SECRETS_PROVIDER,
            debug: !!params.debug
        },
        execa: {
            env: createEnvConfiguration({
                configurations: [
                    withRegion(params),
                    withEnv(params),
                    withEnvVariant(params),
                    withProjectName({ project }),
                    withPulumiConfigPassphrase()
                ]
            })
        }
    });
};
