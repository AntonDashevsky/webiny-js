import React from "react";
import { Property, useIdGenerator } from "@webiny/react-properties";

export interface CliCommandProps {
    name: string;
    src: string;
    remove?: boolean;
    before?: string;
    after?: string;
}

export const CliCommandComponent = ({ name, src, remove, before, after }: CliCommandProps) => {
    const getId = useIdGenerator("Command");

    const placeAfter = after !== undefined ? getId(after) : undefined;
    const placeBefore = before !== undefined ? getId(before) : undefined;

    return (
        <Property
            id={getId(name)}
            name={"cliCommands"}
            remove={remove}
            array={true}
            before={placeBefore}
            after={placeAfter}
        >
            <Property id={getId(name, "name")} name={"name"} value={name} />
            <Property id={getId(name, "src")} name={"src"} value={src} />
            <Property id={getId(name, "__type")} name={"__type"} value={"cliCommand"} />
        </Property>
    );
};
