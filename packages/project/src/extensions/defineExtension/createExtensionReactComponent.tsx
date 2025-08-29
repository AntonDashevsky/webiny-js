import React, { useMemo } from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { DefineExtensionParams } from "./types.js";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createExtensionDefinition } from "~/extensions/defineExtension/createExtensionDefinition";

export interface ExtensionReactComponent<TParamsSchema extends z.ZodTypeAny>
    extends React.FC<
        z.infer<TParamsSchema> & {
            remove?: boolean;
            before?: string;
            after?: string;
        }
    > {
    definition: ReturnType<typeof createExtensionDefinition<TParamsSchema>>;
}

export function createExtensionReactComponent<TParamsSchema extends z.ZodTypeAny>(
    extensionParams: DefineExtensionParams<TParamsSchema>
) {
    type ExtensionReactComponentProps = z.infer<TParamsSchema> & {
        remove?: boolean;
        before?: string;
        after?: string;
    };

    const ExtensionReactComponent: ExtensionReactComponent<TParamsSchema> = props => {
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

    ExtensionReactComponent.displayName = `ExtensionReactComponent(${extensionParams.type})`;
    ExtensionReactComponent.definition = createExtensionDefinition<TParamsSchema>(extensionParams);
    return ExtensionReactComponent;
}
