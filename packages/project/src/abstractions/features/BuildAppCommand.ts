import { Abstraction } from "@webiny/di-container";
import { ICommand } from "./ICommand";

interface BuildAppCommandParams {
    app: string;
    env: string;
    variant?: string;
    region?: string;
    debug?: boolean;
    logs?: boolean;
}

type IBuildAppCommand = ICommand<BuildAppCommandParams>;

export const BuildAppCommand = new Abstraction<IBuildAppCommand>("BuildAppCommand");

export namespace BuildAppCommand {
    export type Interface = IBuildAppCommand;

    export type Params = BuildAppCommandParams;
}
