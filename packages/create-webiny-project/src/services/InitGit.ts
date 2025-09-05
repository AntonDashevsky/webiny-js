import path from "path";
import fs from "fs-extra";
import execa from "execa";
import { CliParams } from "../types.js";
import { GetProjectRootPath } from "./GetProjectRootPath.js";

export class InitGit {
    execute(cliArgs: CliParams) {
        const getProjectRootPath = new GetProjectRootPath();
        const projectRootPath = getProjectRootPath.execute(cliArgs);

        execa.sync("git", ["--version"]);
        execa.sync("git", ["init"], { cwd: projectRootPath });
        fs.writeFileSync(path.join(projectRootPath, ".gitignore"), "node_modules/");
    }
}
