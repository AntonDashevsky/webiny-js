import React from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";

interface CreateExtensionParams<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    description?: string;
    array?: boolean;
    build?: (params: TParams) => Promise<void> | void;
    validate?: (params: TParams) => Promise<void> | void;
}

export type ReactComponentProps<TProps extends Record<string, any> = Record<string, any>> =
    TProps & {
    name: string;
    remove?: boolean;
    before?: string;
    after?: string;
};

export function createExtension<TParams extends Record<string, any> = Record<string, any>>(
    extensionParams: CreateExtensionParams<TParams>
) {
    const { type, description, array, build, validate } = extensionParams;

    class Definition {
        static type = type;
        static description = description || "";
        static array = array || false;

        params: TParams;

        constructor(params: TParams) {
            this.params = params || ({} as TParams);
        }

        build() {
            return build?.(this.params);
        }

        validate() {
            return validate?.(this.params);
        }

        fromDto(dto: TParams) {
            return new Definition(dto);
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
