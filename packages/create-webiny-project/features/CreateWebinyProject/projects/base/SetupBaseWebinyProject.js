import fs from "fs-extra";
import path from "path";
import { GetProjectRootPath } from "../../../../services/GetProjectRootPath.js";

export const renames = [
    {
        prev: "example.gitignore",
        next: ".gitignore"
    },
    {
        prev: "example.gitattributes",
        next: ".gitattributes"
    },
    {
        prev: "example.prettierrc.js",
        next: ".prettierrc.js"
    },
    {
        prev: "example.prettierignore",
        next: ".prettierignore"
    },
    {
        prev: "example.eslintignore",
        next: ".eslintignore"
    },
    {
        prev: "example.eslintrc.js",
        next: ".eslintrc.js"
    },
    {
        prev: "template.package.json",
        next: "package.json"
    }
];

export class SetupBaseWebinyProject {
    execute(cliArgs) {
        const baseTemplatePath = path.join(import.meta.dirname, "template");

        const getProjectRootPath = new GetProjectRootPath();
        const projectRootFolderPath = getProjectRootPath.execute(cliArgs);

        fs.copySync(baseTemplatePath, projectRootFolderPath);

        for (let i = 0; i < renames.length; i++) {
            fs.moveSync(
                path.join(projectRootFolderPath, renames[i].prev),
                path.join(projectRootFolderPath, renames[i].next),
                {
                    overwrite: true
                }
            );
        }
    }
}
