import React, { useMemo } from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { CreateExtensionParams } from "./types";
import { nanoid } from "nanoid";

export type ExtensionReactComponentProps<TProps extends Record<string, any> = Record<string, any>> =
    TProps & {
        name?: string;
        remove?: boolean;
        before?: string;
        after?: string;
    };

// Roxks.
export function createExtensionReactComponent<
    TParams extends Record<string, any> = Record<string, any>
>(extensionParams: CreateExtensionParams<TParams>) {
    return function ExtensionReactComponent(props: ExtensionReactComponentProps<TParams>) {
        const id = useMemo(() => {
            return nanoid();
        }, []);
        const { name = id, remove, before, after, ...extraProps } = props;
        const getId = useIdGenerator(name || "");

        const placeAfter = after !== undefined ? getId(after) : undefined;
        const placeBefore = before !== undefined ? getId(before) : undefined;

        return (
            <Property
                id={getId(extensionParams.type)}
                array={extensionParams.multiple}
                name={extensionParams.type}
                remove={remove}
                before={placeBefore}
                after={placeAfter}
            >
                {/*{name && <Property id={getId(name, "name")} name={"name"} value={name} />}*/}
                {Object.entries(extraProps).map(([key, value]) => {
                    const id = name ? `${name}.${key}` : key;
                    return <Property key={key} name={key} id={id} value={value} />;
                })}
            </Property>
        );
    };
}
