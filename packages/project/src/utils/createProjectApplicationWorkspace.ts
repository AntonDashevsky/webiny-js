import path from "path";
import util from "util";
import ncpBase from "ncp";
import { replaceInPath } from "replace-in-path";
import fs from "fs-extra";
import { AppModel } from "~/models/index.js";

const ncp = util.promisify(ncpBase.ncp);

export interface CreateAppWorkspaceParams {
    app: AppModel;
    env: string;
    variant?: string;
}

export const createAppWorkspace = async ({ app, env, variant }: CreateAppWorkspaceParams) => {
    const appWorkspaceFolderPath = app.paths.workspaceFolder.absolute;

    if (await fs.pathExists(appWorkspaceFolderPath)) {
        await fs.remove(appWorkspaceFolderPath);
    }

    await fs.ensureDir(appWorkspaceFolderPath);
    await ncp(app.paths.appsFolder.absolute, appWorkspaceFolderPath);

    // Wait a bit and make sure the files are ready to have their content replaced.
    await new Promise(resolve => setTimeout(resolve, 10));

    // Copy Pulumi-related files.
    await ncp(path.join(import.meta.dirname, "workspaceTemplate"), appWorkspaceFolderPath);

    // Wait a bit and make sure the files are ready to have their content replaced.
    await new Promise(resolve => setTimeout(resolve, 10));

    replaceInPath(path.join(appWorkspaceFolderPath, "/**/*.{ts,js,yaml}"), [
        { find: "{PROJECT_ID}", replaceWith: app.name },
        { find: "{PROJECT_DESCRIPTION}", replaceWith: `Webiny's ${app.name} app.` },
        { find: "{DEPLOY_ENV}", replaceWith: env },
        {
            find: "{DEPLOY_VARIANT}",
            replaceWith: !variant || variant === "undefined" ? "" : variant
        }
    ]);
};
