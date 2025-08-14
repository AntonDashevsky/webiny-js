import { Abstraction } from "@webiny/di-container";
import { ExtensionTags } from "~/extensions/defineExtension/types";

export interface ExtensionDefinitionModelParams<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    tags?: ExtensionTags;
    description: string;
    array?: boolean;
    abstraction?: Abstraction<any>;

    build?(params: TParams): Promise<void> | void;

    validate?(params: TParams): Promise<void> | void;
}

export class ExtensionDefinitionModel<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    description: string;
    tags: ExtensionTags;
    multiple?: boolean;
    abstraction?: Abstraction<any>;

    build?(params: TParams): Promise<void> | void;

    validate?(params: TParams): Promise<void> | void;

    constructor(params: ExtensionDefinitionModelParams) {
        this.type = params.type;
        this.tags = params.tags || {};
        this.description = params.description;
        this.multiple = params.array;
        this.abstraction = params.abstraction;
        this.build = params.build;
        this.validate = params.validate;
    }
}
