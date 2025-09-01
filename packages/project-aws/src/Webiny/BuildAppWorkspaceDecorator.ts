import { createDecorator } from "@webiny/di-container";
import path from "path";
import fs from "fs";
import { replaceInPath } from "replace-in-path";
import { BuildApp, GetApp } from "@webiny/project/abstractions/index.js";
import { getTemplatesFolderPath } from "~/utils";

const wait = () => new Promise(resolve => setTimeout(resolve, 10));

class BuildAppWorkspaceDecorator implements BuildApp.Interface {
    constructor(private getApp: GetApp.Interface, private decoratee: BuildApp.Interface) {}

    async execute(params: BuildApp.Params) {
        // 1. Construct required paths.
        const templatesFolderPath = getTemplatesFolderPath();

        const app = this.getApp.execute(params.app);

        const appWorkspaceFolderPath = app.paths.workspaceFolder.toString();
        const baseTemplateFolderPath = path.join(templatesFolderPath, "appTemplates", "base");
        const appTemplateFolderPath = path.join(templatesFolderPath, "appTemplates", app.name);

        // 2. Do the cleanup first.
        if (fs.existsSync(appWorkspaceFolderPath)) {
            fs.rmSync(appWorkspaceFolderPath, { recursive: true, force: true });
        }

        fs.mkdirSync(appWorkspaceFolderPath, { recursive: true });

        // Wait a bit and make sure the files are ready to have their content replaced.
        await wait();

        // 3. Create base.
        fs.cpSync(baseTemplateFolderPath, appWorkspaceFolderPath, { recursive: true });

        // Wait a bit and make sure the files are ready to have their content replaced.
        await wait();

        const { env, variant } = params;

        replaceInPath(path.join(appWorkspaceFolderPath, "/**/*.{ts,js,yaml}"), [
            { find: "{PROJECT_ID}", replaceWith: app.name },
            { find: "{PROJECT_DESCRIPTION}", replaceWith: `Webiny's ${env} app.` },
            { find: "{DEPLOY_ENV}", replaceWith: env },
            {
                find: "{DEPLOY_VARIANT}",
                replaceWith: !variant || variant === "undefined" ? "" : variant
            }
        ]);

        // 4. Create app.
        fs.cpSync(appTemplateFolderPath, appWorkspaceFolderPath, { recursive: true });

        return this.decoratee.execute(params);
    }
}

export default createDecorator({
    abstraction: BuildApp,
    decorator: BuildAppWorkspaceDecorator,
    dependencies: [GetApp]
});
