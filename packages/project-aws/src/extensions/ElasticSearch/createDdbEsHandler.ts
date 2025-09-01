import { createImplementation } from "@webiny/di-container";
import { CoreBeforeBuild } from "@webiny/project/abstractions";
import path from "path";
import fs from "fs";
import { GetApp } from "@webiny/project/abstractions/index.js";
import { getTemplatesFolderPath } from "~/utils";

const wait = () => new Promise(resolve => setTimeout(resolve, 10));

class MyCoreBeforeBuild implements CoreBeforeBuild.Interface {
    constructor(private getApp: GetApp.Interface) {}

    async execute() {
        const templatesFolderPath = getTemplatesFolderPath();

        const app = this.getApp.execute("core");

        const appWorkspaceFolderPath = app.paths.workspaceFolder.get();
        const ddbToEsHandlerTemplateFolderPath = path.join(
            templatesFolderPath,
            "extensions",
            "coreDdbToEsHandler"
        );

        if (fs.existsSync(appWorkspaceFolderPath)) {
            fs.rmSync(appWorkspaceFolderPath, { recursive: true, force: true });
        }

        fs.mkdirSync(appWorkspaceFolderPath, { recursive: true });

        // Wait a bit and make sure the files are ready to have their content replaced.
        await wait();

        fs.cpSync(ddbToEsHandlerTemplateFolderPath, appWorkspaceFolderPath, {
            recursive: true
        });
    }
}

export default createImplementation({
    abstraction: CoreBeforeBuild,
    implementation: MyCoreBeforeBuild,
    dependencies: [GetApp]
});
