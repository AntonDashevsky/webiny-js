import React from "react";
import type { FormRenderPropParams } from "@webiny/form";
import type { InputElementRenderProps } from "@webiny/app-admin/ui/elements/form/InputElement";
import { InputElement } from "@webiny/app-admin/ui/elements/form/InputElement";
import { TeamAutocomplete } from "@webiny/app-security-access-management/components/TeamAutocomplete";

export class TeamAutocompleteElement extends InputElement {
    public override render(
        this: TeamAutocompleteElement,
        { formProps }: InputElementRenderProps
    ): React.ReactElement {
        const { Bind } = formProps as FormRenderPropParams;

        const validators = this.config.validators;
        /**
         * TODO @ts-refactor @bruno
         * Figure out what can validators be.
         */
        if (validators && typeof validators !== "function") {
            console.log(
                "packages/app-admin-users-cognito/src/ui/elements/TeamAutocompleteElement.tsx validators is set but not a function."
            );
            console.log(validators);
        }
        return (
            <Bind
                name={this.id}
                validators={typeof validators === "function" ? validators({ formProps }) : []}
            >
                <TeamAutocomplete label={"Team"} data-testid="team-autocomplete" />
            </Bind>
        );
    }
}
