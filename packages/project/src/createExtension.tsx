import React from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";

// Instance-side interface
export interface ExtensionDefinitionInstance<
    TParams extends Record<string, any> = Record<string, any>
> {
    params: TParams;

    build?(): Promise<void> | void;

    validate?(): Promise<void> | void;
}

// Static-side interface (constructor + static properties)
export interface ExtensionDefinitionClass<
    TParams extends Record<string, any> = Record<string, any>,
    TInstance extends ExtensionDefinitionInstance<TParams> = ExtensionDefinitionInstance<TParams>
> {
    type: string;
    description: string;
    array: boolean;

    new (params: TParams): TInstance;

    fromDto(params: TParams): TInstance;
}

export type ExtensionDefinition<TParams extends Record<string, any> = Record<string, any>> =
    ExtensionDefinitionInstance<TParams>;

export type ReactComponentProps<TProps extends Record<string, any> = Record<string, any>> =
    TProps & {
        name: string;
        remove?: boolean;
        before?: string;
        after?: string;
    };

export interface CreateExtensionParams<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    description?: string;
    array?: boolean;
    build?: (params: TParams) => Promise<void> | void;
    validate?: (params: TParams) => Promise<void> | void;
}

export function createExtension<TParams extends Record<string, any> = Record<string, any>>(
    extensionParams: CreateExtensionParams<TParams>
) {
    const { type, description, array, build, validate } = extensionParams;

    class Definition implements ExtensionDefinitionInstance<TParams> {
        static type = type;
        static description = description || "";
        static array = array || false;

        constructor(public params: TParams) {}

        build() {
            return build?.(this.params);
        }

        validate() {
            return validate?.(this.params);
        }

        static fromDto(params: TParams) {
            return new Definition(params);
        }
    }

    const ReactComponent = (props: ReactComponentProps<TParams>) => {
        const { name, remove, before, after, ...extraProps } = props;
        const getId = useIdGenerator(name);

        const placeAfter = after !== undefined ? getId(after) : undefined;
        const placeBefore = before !== undefined ? getId(before) : undefined;

        return (
            <Property
                id={getId(extensionParams.type)}
                array={extensionParams.array}
                name={extensionParams.type}
                remove={remove}
                before={placeBefore}
                after={placeAfter}
            >
                <Property id={getId(name, "name")} name={"name"} value={name} />
                <Property id={getId(name, "__type")} name={"__type"} value={extensionParams.type} />
                {Object.entries(extraProps).map(([key, value]) => (
                    <Property key={key} id={getId(name, key)} name={key} value={value} />
                ))}
            </Property>
        );
    };

    return { ReactComponent, Definition };
}
