import { createImplementation } from "@webiny/di-container";
import {
    DeployApp,
    GetApp,
    GetProject,
    GetPulumiService,
    PulumiGetSecretsProviderService,
    PulumiSelectStackService
} from "~/abstractions/index.js";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName,
    withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env/index.js";

export class DefaultDeployApp implements DeployApp.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private getProject: GetProject.Interface,
        private pulumiSelectStackService: PulumiSelectStackService.Interface,
        private getPulumiService: GetPulumiService.Interface,
        private pulumiGetSecretsProviderService: PulumiGetSecretsProviderService.Interface
    ) {}

    async execute(params: DeployApp.Params) {
        const app = await this.getApp.execute(params.app);

        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        await this.pulumiSelectStackService.execute(app, params);

        // A Pulumi refresh might be executed before the deploy. For example,
        // this is needed if the user run the watch command prior to the deploy.
        // await executeRefresh(commandParams);

        const pulumi = await this.getPulumiService.execute({ app });
        const project = await this.getProject.execute();

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

        return { pulumiProcess };
    }
}

export const deployApp = createImplementation({
    abstraction: DeployApp,
    implementation: DefaultDeployApp,
    dependencies: [
        GetApp,
        GetProject,
        PulumiSelectStackService,
        GetPulumiService,
        PulumiGetSecretsProviderService
    ]
});
