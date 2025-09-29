import { createImplementation } from "@webiny/di-container";
import { BeforeWatch, GetApp, UiService } from "~/abstractions/index.js";
import { GracefulError } from "@webiny/project";

class EnsureAppBuiltBeforeWatch implements BeforeWatch.Interface {
    constructor(
        private uiService: UiService.Interface,
        private getApp: GetApp.Interface
    ) {}

    async execute(params: BeforeWatch.Params) {
        if (!("app" in params)) {
            return;
        }

        const app = this.getApp.execute(params.app);

        if (app.paths.workspaceFolder.existsSync()) {
            return;
        }

        const ui = this.uiService;
        ui.error(`Cannot watch %s. Please build the app first.`, app.getDisplayName());

        const cmd = `yarn webiny build ${params.app} --env ${params.env}`;

        throw GracefulError.from(
            `Before watching %s, please build it first by running: %s.`,
            app.getDisplayName(),
            cmd
        );
    }
}

export default createImplementation({
    abstraction: BeforeWatch,
    implementation: EnsureAppBuiltBeforeWatch,
    dependencies: [UiService, GetApp]
});
