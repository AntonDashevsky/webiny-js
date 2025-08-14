import { Abstraction } from "@webiny/di-container";

export interface IWebsitePulumi<TApp> {
    execute(app: TApp): void | Promise<void>;
}

export const WebsitePulumi = new Abstraction<IWebsitePulumi<unknown>>("WebsitePulumi");

export namespace WebsitePulumi {
    export type Interface = IWebsitePulumi<unknown>;
    export type Params = unknown;
}
