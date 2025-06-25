import { Container } from "@webiny/di-container";
import { aboutCommand } from "./features";
import { getProjectSdkService } from "./services";

export class Cli2Sdk {
    cwd: string;
    container: Container;

    protected constructor(cwd?: string) {
        this.cwd = cwd || process.cwd();

        this.container = new Container();

        // Services.
        this.container.register(getProjectSdkService).inSingletonScope();

        // Commands.
        this.container.register(aboutCommand).inSingletonScope();
    }

    listCommands() {

    }

    static init(cwd?: string) {
        return new Cli2Sdk(cwd);
    }
}
