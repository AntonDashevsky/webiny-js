import { Container, type Implementation } from "@webiny/di-container";
import { buildCommand, watchCommand, consoleLogger } from "~/impl";

export interface CliParams {
    implementations?: Implementation<any>[];
}

export class Cli {
    private readonly container: Container;

    constructor({ implementations = [] }: CliParams) {
        this.container = new Container();

        this.container.register(consoleLogger).inSingletonScope();

        // Commands.
        this.container.register(buildCommand);
        this.container.register(watchCommand);

    }

    async run() {
    }

    register(impl: Implementation<any>) {
        this.container.register(impl);
    }
}


const cli = new Cli(config);