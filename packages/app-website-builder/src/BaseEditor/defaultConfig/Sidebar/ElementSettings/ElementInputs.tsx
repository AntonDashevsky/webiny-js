import React from "react";
import { Grid, Select } from "@webiny/admin-ui";
import type { ComponentInput, DocumentElement } from "~/sdk/types";
import { useComponent } from "~/BaseEditor/hooks/useComponent";
import { useInputRenderer } from "./useInputRenderer";
import { useInputValue } from "./useInputValue";
// import { ExpressionRenderer } from "./ExpressionRenderer";
// import { WithBindingToggle } from "./WithBindingToggle";
import { useStateArrays } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/useStateArrays";
import { useRepeatValue } from "./useRepeatValue";
import { WithBindingToggle } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/WithBindingToggle";
import { ExpressionRenderer } from "./ExpressionRenderer";

interface ElementInputsProps {
    element: DocumentElement;
}

export const ElementInputs = ({ element }: ElementInputsProps) => {
    const component = useComponent(element.component.name);
    const repeat = useRepeatValue(element.id);
    const arrayOptions = useStateArrays();

    return (
        <Grid>
            <Grid.Column key={"repeat"} span={12}>
                <Select
                    label={"Repeat for each"}
                    placeholder={"Select binding"}
                    options={arrayOptions}
                    value={repeat.value ?? ""}
                    onChange={value => repeat.onChange(value === "" ? undefined : value)}
                />
            </Grid.Column>
            <>
                {(component.inputs ?? []).map(input => {
                    return (
                        <Grid.Column key={input.name} span={12}>
                            <ElementInput element={element} input={input} />
                        </Grid.Column>
                    );
                })}
            </>
        </Grid>
    );
};

interface ElementInputProps {
    element: DocumentElement;
    input: ComponentInput;
}

const ElementInput = ({ element, input }: ElementInputProps) => {
    const Renderer = useInputRenderer(input.renderer || "__unknown__");

    const { value, onChange, onPreviewChange, setBindingType } = useInputValue(element, input);

    /*   return (
        <Renderer
            value={value.static}
            input={input}
            onChange={onChange}
            onPreviewChange={onPreviewChange}
        />
    );*/
    if (value.expression) {
        return (
            <WithBindingToggle type={"expression"} setBindingType={setBindingType}>
                <ExpressionRenderer
                    element={element}
                    value={value.expression}
                    onChange={onChange}
                    input={input}
                />
            </WithBindingToggle>
        );
    }

    return (
        <WithBindingToggle type={"static"} setBindingType={setBindingType}>
            <Renderer
                value={value.static}
                input={input}
                onChange={onChange}
                onPreviewChange={onPreviewChange}
            />
        </WithBindingToggle>
    );
};
