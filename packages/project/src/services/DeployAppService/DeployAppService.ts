import { createImplementation } from "@webiny/di-container";
import {
    BuildApp,
    DeployAppService,
    GetProjectService,
    GetPulumiService,
    PulumiGetSecretsProviderService,
    PulumiSelectStackService
} from "~/abstractions";
import { AppModel } from "~/models";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName,
    withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env";

export class DefaultDeployAppService implements DeployAppService.Interface {
    constructor(
        private buildApp: BuildApp.Interface,
        private getProjectService: GetProjectService.Interface,
        private getPulumiService: GetPulumiService.Interface,
        private pulumiSelectStackService: PulumiSelectStackService.Interface,
        private pulumiGetSecretsProviderService: PulumiGetSecretsProviderService.Interface
    ) {}

    async execute(app: AppModel, params: DeployAppService.Params) {
        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        await this.buildApp.execute(params);

        await this.pulumiSelectStackService.execute(app, params);

        // A Pulumi refresh might be executed before the deploy. For example,
        // this is needed if the user run the watch command prior to the deploy.
        // await executeRefresh(commandParams);

        const pulumi = await this.getPulumiService.execute({ app });
        const project = this.getProjectService.execute();

        const env = createEnvConfiguration({
            configurations: [
                withRegion(params),
                withEnv(params),
                withEnvVariant(params),
                withProjectName({ project }),
                withPulumiConfigPassphrase()
            ]
        });

        const secretsProvider = this.pulumiGetSecretsProviderService.execute();
        const pulumiProcess = params.preview
            ? pulumi.run({
                  command: "preview",
                  args: {
                      diff: true,
                      debug: !!params.debug

                      // Preview command does not accept "--secrets-provider" argument.
                      // secretsProvider: PULUMI_SECRETS_PROVIDER
                  },
                  execa: { env }
              })
            : pulumi.run({
                  command: "up",
                  args: {
                      yes: true,
                      skipPreview: true,
                      secretsProvider,
                      debug: !!params.debug
                  },
                  execa: { env }
              });

        if (params.onPulumiProcess) {
            params.onPulumiProcess(pulumiProcess);
        }
    }
}

export const deployAppService = createImplementation({
    abstraction: DeployAppService,
    implementation: DefaultDeployAppService,
    dependencies: [
        BuildApp,
        GetProjectService,
        GetPulumiService,
        PulumiSelectStackService,
        PulumiGetSecretsProviderService
    ]
});
