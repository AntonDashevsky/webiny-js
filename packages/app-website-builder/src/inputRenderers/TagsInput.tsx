import React from "react";
import type { TextInput } from "~/sdk/types";

interface ElementInputProps<T> {
    value: T;
    onChange: (value: T) => void;
    componentInput: TextInput;
}

export const TagsInputRenderer = ({
    value,
    onChange,
    componentInput
}: ElementInputProps<string[]>) => {
    return <span>Webiny/Tags</span>;
};
