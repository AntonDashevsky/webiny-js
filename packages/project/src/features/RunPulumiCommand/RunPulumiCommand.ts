import { createImplementation } from "@webiny/di-container";
import {
    RunPulumiCommand,
    GetApp,
    GetProject,
    GetPulumiService,
    PulumiSelectStackService
} from "~/abstractions/index.js";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName, withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env/index.js";

export class DefaultRunPulumiCommand implements RunPulumiCommand.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private getProject: GetProject.Interface,
        private pulumiSelectStackService: PulumiSelectStackService.Interface,
        private getPulumiService: GetPulumiService.Interface
    ) {}

    async execute(params: RunPulumiCommand.Params): Promise<void> {
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
            command: params.command as string[],
            execa: { env }
        });

        if (params.onPulumiProcess) {
            params.onPulumiProcess(pulumiProcess);
        }
    }
}

export const runPulumiCommand = createImplementation({
    abstraction: RunPulumiCommand,
    implementation: DefaultRunPulumiCommand,
    dependencies: [GetApp, GetProject, PulumiSelectStackService, GetPulumiService]
});
