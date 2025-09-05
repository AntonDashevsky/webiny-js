import path from "path";
import fs from "fs-extra";
import execa from "execa";

export class InitGit {
    async execute({ projectRootPath }) {
        execa.sync("git", ["--version"]);
        execa.sync("git", ["init"], { cwd: projectRootPath });
        fs.writeFileSync(path.join(projectRootPath, ".gitignore"), "node_modules/");
    }
}
