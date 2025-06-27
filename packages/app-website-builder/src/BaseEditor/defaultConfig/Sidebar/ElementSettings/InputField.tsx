import React from "react";
import { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";
// import { FieldArray } from "./FieldArray";
import { useInputRenderer } from "./useInputRenderer";
import { useInputValue } from "./useInputValue";
import { DocumentElementBindings } from "~/sdk/types";
import { InheritanceLabel } from "../InheritanceLabel";

interface InputFieldProps {
    node: InputAstNode;
    bindings: DocumentElementBindings["inputs"];
}

export function InputField({ node }: InputFieldProps) {
    const Renderer = useInputRenderer(node.input.renderer!);
    const { value, onChange, onPreviewChange, inheritanceMap, onReset } = useInputValue(node);
    const input = node.input;

    if (input.type === "object") {
        // TODO: nested inputs will be implemented at a later stage.
        return;

        /*if (node.list) {
            return <FieldArray node={node} bindings={bindings} />;
        }

        return (
            <fieldset>
                <legend>{input.label}</legend>
                {node.children.map(child => (
                    <InputField key={child.path} node={child} bindings={bindings} />
                ))}
            </fieldset>
        );*/
    }

    const label = node.input.responsive ? (
        <InheritanceLabel
            text={input.label}
            inheritedFrom={inheritanceMap?.inheritedFrom}
            isOverridden={inheritanceMap?.overridden ?? false}
            onReset={onReset}
        />
    ) : (
        input.label
    );

    return (
        <Renderer
            label={label}
            value={value.static}
            onChange={onChange}
            onPreviewChange={onPreviewChange}
            input={node.input}
        />
    );

    // We'll implement expression bindings at a later stage.
    /*return value.expression ? (
        <WithBindingToggle type={"expression"} setBindingType={setBindingType}>
            <ExpressionRenderer
                element={activeElement!}
                value={value.expression}
                onChange={onChange}
                input={input}
            />
        </WithBindingToggle>
    ) : (
        <WithBindingToggle type={"static"} setBindingType={setBindingType}>
            <Renderer
                value={value.static}
                onChange={onChange}
                onPreviewChange={onPreviewChange}
                input={node.input}
            />
        </WithBindingToggle>
    );*/
}
