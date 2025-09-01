import { createImplementation } from "@webiny/di-container";
import { ApiBeforeBuild } from "@webiny/project/abstractions";
import path from "path";
import fs from "fs";
import { GetApp } from "@webiny/project/abstractions/index.js";
import { getTemplatesFolderPath } from "~/utils";

const wait = () => new Promise(resolve => setTimeout(resolve, 10));

class ReplaceApiLambdaFnHandlers implements ApiBeforeBuild.Interface {
    constructor(private getApp: GetApp.Interface) {}

    async execute() {
        const templatesFolderPath = getTemplatesFolderPath();

        const app = this.getApp.execute("api");

        const appWorkspaceFolderPath = app.paths.workspaceFolder.toString();
        const ddbToEsHandlerTemplateFolderPath = path.join(
            templatesFolderPath,
            "extensions",
            "ElasticSearch",
            "api"
        );

        console.log("rezi bratko!");
        fs.cpSync(ddbToEsHandlerTemplateFolderPath, appWorkspaceFolderPath, {
            recursive: true,
            force: true
        });

        // Wait a bit and make sure the files are ready to have their content replaced.
        await wait();
    }
}

export default createImplementation({
    abstraction: ApiBeforeBuild,
    implementation: ReplaceApiLambdaFnHandlers,
    dependencies: [GetApp]
});
