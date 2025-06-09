import React from "react";
import { type FormRenderPropParams } from "@webiny/form";
import { InputElement } from "@webiny/app-admin/ui/elements/form/InputElement.js";
import { TeamAutocomplete } from "~/components/TeamAutocomplete/index.js";
import { type FormFieldElementRenderProps } from "@webiny/app-admin/ui/elements/form/FormFieldElement.js";

export class TeamAutocompleteElement extends InputElement {
    public override render(props: FormFieldElementRenderProps): React.ReactElement {
        const { formProps } = props;
        const { Bind } = formProps as FormRenderPropParams;
        const validators = this.config.validators;
        /**
         * TODO @ts-refactor @bruno
         * Figure out what can validators be.
         */
        if (validators && typeof validators !== "function") {
            console.log(
                "packages/app-security-access-management/src/ui/elements/TeamAutocompleteElement.tsx validators is set but not a function."
            );
            console.log(validators);
        }
        return (
            <Bind
                name={this.id}
                validators={typeof validators === "function" ? validators({ formProps }) : []}
            >
                <TeamAutocomplete label={"Team"} />
            </Bind>
        );
    }
}
