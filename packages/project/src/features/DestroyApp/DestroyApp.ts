import { createImplementation } from "@webiny/di-container";
import {
    DestroyApp,
    GetApp,
    GetProject,
    GetPulumiService,
    PulumiSelectStackService
} from "~/abstractions";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName,
    withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env";

export class DefaultDestroyApp implements DestroyApp.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private getProject: GetProject.Interface,
        private pulumiSelectStackService: PulumiSelectStackService.Interface,
        private getPulumiService: GetPulumiService.Interface
    ) {}

    async execute(params: DestroyApp.Params): Promise<void> {
        const app = await this.getApp.execute(params.app);

        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        await this.pulumiSelectStackService.execute(app, params);

        const pulumi = await this.getPulumiService.execute({ app });
        const project = await this.getProject.execute();

        const env = createEnvConfiguration({
            configurations: [
                withRegion(params),
                withEnv(params),
                withEnvVariant(params),
                withPulumiConfigPassphrase(),
                withProjectName({ project })
            ]
        });

        const pulumiProcess = pulumi.run({
            command: "destroy",
            args: {
                debug: params.debug || false,
                yes: true
            },
            execa: { env }
        });

        if (params.onPulumiProcess) {
            params.onPulumiProcess(pulumiProcess);
        }
    }
}

export const destroyApp = createImplementation({
    abstraction: DestroyApp,
    implementation: DefaultDestroyApp,
    dependencies: [GetApp, GetProject, PulumiSelectStackService, GetPulumiService]
});
