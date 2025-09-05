import path from "path";

export class GetProjectRootPath {
    execute(cliArgs) {
        return path.resolve(cliArgs.projectName).replace(/\\/g, "/");
    }
}
