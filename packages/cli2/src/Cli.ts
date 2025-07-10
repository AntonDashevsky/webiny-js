import { Container } from "@webiny/di-container";
import { createCliContainer } from "./createCliContainer.js";
import { RunCliRunnerService } from "~/abstractions/index.js";

export class Cli {
    private container: Container;

    private constructor(container: Container) {
        this.container = container;
    }

    run(argv: string[]) {
        return this.container.resolve(RunCliRunnerService).execute(argv);
    }

    static async init() {
        const container = await createCliContainer();
        return new Cli(container);
    }
}
