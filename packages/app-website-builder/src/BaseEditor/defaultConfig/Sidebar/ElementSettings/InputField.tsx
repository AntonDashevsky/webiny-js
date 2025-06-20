import React from "react";
import { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";
import { FieldArray } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/FieldArray";
import { useInputRenderer } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/useInputRenderer";
import { useInputValue } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/useInputValue";
import { DocumentElementBindings } from "~/sdk/types";

export function InputField({
    node,
    bindings = {}
}: {
    node: InputAstNode;
    bindings: DocumentElementBindings["inputs"];
}) {
    const Renderer = useInputRenderer(node.input.renderer!);
    const { value, onChange, onPreviewChange } = useInputValue(node);
    const input = node.input;

    if (input.type === "object") {
        if (node.list) {
            return <FieldArray node={node} bindings={bindings} />;
        }

        return (
            <fieldset>
                <legend>{input.label}</legend>
                {node.children.map(child => (
                    <InputField key={child.path} node={child} bindings={bindings} />
                ))}
            </fieldset>
        );
    }

    return (
        <Renderer
            value={value.static}
            onChange={onChange}
            onPreviewChange={onPreviewChange}
            input={node.input}
        />
    );
}
