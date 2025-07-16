import React from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { CreateExtensionParams } from "./types";

export type ExtensionReactComponentProps<TProps extends Record<string, any> = Record<string, any>> =
    TProps & {
        name?: string;
        remove?: boolean;
        before?: string;
        after?: string;
    };

export function createExtensionReactComponent<
    TParams extends Record<string, any> = Record<string, any>
>(extensionParams: CreateExtensionParams<TParams>) {
    return function ExtensionReactComponent(props: ExtensionReactComponentProps<TParams>) {
        const { name, remove, before, after, ...extraProps } = props;
        const getId = useIdGenerator(name || "");

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
                {name && <Property id={getId(name, "name")} name={"name"} value={name} />}
                {Object.entries(extraProps).map(([key, value]) => {
                    const id = name ? `${name}.${key}` : key;
                    return <Property key={key} id={id} name={key} value={value} />;
                })}
            </Property>
        );
    };
}
