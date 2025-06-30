import { Abstraction } from "@webiny/di-container";
import { I } from "./I";

interface BuildAppParams {
    app: string;
    env: string;
    variant?: string;
    region?: string;
    debug?: boolean;
    logs?: boolean;
}

type IBuildApp = I<BuildAppParams>;

export const BuildApp = new Abstraction<IBuildApp>("BuildApp");

export namespace BuildApp {
    export type Interface = IBuildApp;

    export type Params = BuildAppParams;
}
