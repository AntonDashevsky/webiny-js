import React from "react";
import { Grid, Select } from "@webiny/admin-ui";
import type { ComponentInput, ComponentManifest, DocumentElement } from "~/sdk/types";
import { useComponent } from "~/BaseEditor/hooks/useComponent";
import { useInputRenderer } from "./useInputRenderer";
import { useInputValue } from "./useInputValue";
import { ExpressionRenderer } from "./ExpressionRenderer";
import { WithBindingToggle } from "./WithBindingToggle";
import { useStateArrays } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/useStateArrays";
import { useRepeatValue } from "./useRepeatValue";

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
                            <ElementInput element={element} input={input} component={component} />
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
    component: ComponentManifest;
}

const ElementInput = ({ element, input, component }: ElementInputProps) => {
    const Renderer = useInputRenderer(input.renderer || "__unknown__");

    const { value, onChange, setBindingType } = useInputValue(element, input);

    if (value.type === "static") {
        return (
            <WithBindingToggle type={value.type} setBindingType={setBindingType}>
                <Renderer value={value.value} input={input} onChange={onChange} />
            </WithBindingToggle>
        );
    }

    return (
        <WithBindingToggle type={value.type} setBindingType={setBindingType}>
            <ExpressionRenderer
                element={element}
                value={value.value}
                onChange={onChange}
                input={input}
            />
        </WithBindingToggle>
    );
};
