import { Container } from "@webiny/di-container";
// import { ProjectPaths } from "./ProjectPaths";

import { projectInfoCommand } from "./features";

import {
    getIsCi,
    getNpmVersion,
    getNpxVersion,
    getPulumiVersion,
    getYarnVersion
} from "./services";

import { ProjectInfoCommand } from "~/abstractions";

export class Project {
    // paths: ProjectPaths;
    container: Container;

    private constructor(cwd?: string) {
        // this.paths = new ProjectPaths(cwd);
        this.container = new Container();

        this.container.register(getIsCi).inSingletonScope();
        this.container.register(getNpmVersion).inSingletonScope();
        this.container.register(getNpxVersion).inSingletonScope();
        this.container.register(getPulumiVersion).inSingletonScope();
        this.container.register(getYarnVersion).inSingletonScope();
        this.container.register(projectInfoCommand).inSingletonScope();
    }

    getProjectInfo() {
        return this.container.resolve(ProjectInfoCommand).execute();
    }

    static init(cwd?: string) {
        return new Project(cwd);
    }
}
