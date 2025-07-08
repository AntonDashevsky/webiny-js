import { Container } from "@webiny/di-container";
import { createCliContainer } from "./createCliContainer.js";
import { RunCliRunnerService } from "~/abstractions/index.js";

export class Cli {
    private container: Container;

    private constructor() {
        this.container = createCliContainer();
    }

    run(argv: string[]) {
        return this.container.resolve(RunCliRunnerService).execute(argv);
    }

    static async init() {
        return new Cli();
    }
}
