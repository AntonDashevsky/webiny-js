import React from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";


interface CreateExtensionParams {
    type: string;
    description?: string;
    array?: boolean;
    build?: () => void;
    validate?: () => void;
}

export interface ReactComponentProps<TParams extends Record<string, any> = Record<string, any>> {
    name: string;
    remove?: boolean;
    before?: string;
    after?: string;
}

export function createExtension<TParams extends Record<string, any> = Record<string, any>>(
    params: CreateExtensionParams
) {
    class Definition {
        type = params.type;
        description = params.description || "";
        build() {
            if (params.build) {
                return params.build();
            }
            return Promise.resolve();
        }

        validate() {
            if (params.validate) {
                return params.validate();
            }
            return Promise.resolve();
        }
    }

    const ReactComponent = (props: ReactComponentProps<TParams>) => {
        const { name, remove, before, after, ...extraProps } = props;
        const getId = useIdGenerator(name);

        const placeAfter = after !== undefined ? getId(after) : undefined;
        const placeBefore = before !== undefined ? getId(before) : undefined;

        return (
            <Property
                id={getId(params.type)}
                array={params.array}
                name={params.type}
                remove={remove}
                before={placeBefore}
                after={placeAfter}
            >
                <Property id={getId(name, "name")} name={"name"} value={name} />
                <Property id={getId(name, "__type")} name={"__type"} value={params.type} />
                {Object.entries(extraProps).map(([key, value]) => (
                    <Property key={key} id={getId(name, key)} name={key} value={value} />
                ))}
            </Property>
        );
    };

    return { ReactComponent, Definition };
}
