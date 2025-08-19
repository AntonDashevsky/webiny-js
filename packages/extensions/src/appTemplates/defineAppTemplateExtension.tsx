import { defineExtension } from "@webiny/project/extensions";
import { AppName } from "@webiny/project/abstractions/types";
import path from "path";
import fs from "fs";
import util from "util";
import ncpBase from "ncp";
import findUp from "find-up";
import { replaceInPath } from "replace-in-path";

const ncp = util.promisify(ncpBase.ncp);

const TEMPLATES_FOLDER_NAME = "_templates";
const BASE_APP_TEMPLATE_FOLDER_NAME = "baseAppTemplate";

export interface CreateAppTemplateParams {
    appName: AppName;
    description: string;
}

class AppTemplateExtensionsBuild implements BuildExtension {
    execute() {}
}

export const defineAppTemplateExtension = (params: CreateAppTemplateParams) =>
    defineExtension({
        type: `AppTemplate/${params.appName}`,
        tags: { runtimeContext: "app-build", appName: params.appName },
        description: params.description,

        // TODO: improve this. Ideally, we'd implement `build` via `createImplementation`. This way
        // TODO: we'd be able to inject deps like logger, getAppService, etc., and avoid `ctx`.
        build: async (_, ctx) => {
            // 1. Construct required paths.
            const templatesFolderPath = await findUp(TEMPLATES_FOLDER_NAME, {
                type: "directory",
                cwd: path.join(import.meta.dirname)
            });

            if (!templatesFolderPath) {
                // This should never happen because we're controlling the templates.
                throw new Error(
                    "Could not find the `appTemplates` folder. Something went terribly wrong."
                );
            }

            const appBaseTemplateFolderPath = path.join(
                templatesFolderPath,
                BASE_APP_TEMPLATE_FOLDER_NAME
            );

            const appTemplateFolderPath = path.join(
                templatesFolderPath,
                "appTemplates",
                params.appName
            );

            const appWorkspaceFolderPath = path.join(
                ctx.project.paths.workspacesFolder.absolute,
                "apps",
                params.appName
            );

            // 2. Do the cleanup first.
            if (fs.existsSync(appWorkspaceFolderPath)) {
                fs.rmSync(appWorkspaceFolderPath, { recursive: true, force: true });
            }

            fs.mkdirSync(appWorkspaceFolderPath, { recursive: true });

            // Wait a bit and make sure the files are ready to have their content replaced.
            await new Promise(resolve => setTimeout(resolve, 10));

            // Copy base template.
            await ncp(appBaseTemplateFolderPath, appWorkspaceFolderPath);

            // Wait a bit and make sure the files are ready to have their content replaced.
            await new Promise(resolve => setTimeout(resolve, 10));

            const { env, variant } = ctx;

            replaceInPath(path.join(appWorkspaceFolderPath, "/**/*.{ts,js,yaml}"), [
                { find: "{PROJECT_ID}", replaceWith: params.appName },
                { find: "{PROJECT_DESCRIPTION}", replaceWith: `Webiny's ${params.appName} app.` },
                { find: "{DEPLOY_ENV}", replaceWith: env },
                {
                    find: "{DEPLOY_VARIANT}",
                    replaceWith: !variant || variant === "undefined" ? "" : variant
                }
            ]);

            // Copy Pulumi-related files.
            await ncp(appTemplateFolderPath, appWorkspaceFolderPath);
        }
    });
