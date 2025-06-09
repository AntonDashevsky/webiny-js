import React from "react";
import { css } from "emotion";
import { merge } from "dot-prop-immutable";
import { Switch } from "@webiny/ui/Switch/index.js";
import { Form } from "@webiny/form";
import { validation } from "@webiny/validation";
import { withActiveElement } from "~/editor/components/index.js";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { UpdateElementActionEvent } from "~/editor/recoil/actions/index.js";
import { type PbEditorPageElementSettingsRenderComponentProps, type PbEditorElement } from "~/types.js";
// Components
import Accordion from "../components/Accordion.js";
import Wrapper from "../components/Wrapper.js";
import InputField from "../components/InputField.js";

const classes = {
    gridClass: css({
        "&.mdc-layout-grid": {
            padding: 0,
            marginBottom: 24
        }
    }),
    gridCellClass: css({
        justifySelf: "end"
    })
};

interface LinkSettingsFormData {
    newTab?: boolean;
    href?: string;
}

interface LinkSettingsPropsType {
    element: PbEditorElement;
}

type LinkSettingsComponentProps = LinkSettingsPropsType &
    PbEditorPageElementSettingsRenderComponentProps;

const LinkSettingsComponent = ({ element, defaultAccordionValue }: LinkSettingsComponentProps) => {
    const handler = useEventActionHandler();

    const { href, newTab } = element.data?.link || {};

    const updateElement = (element: PbEditorElement) => {
        handler.trigger(
            new UpdateElementActionEvent({
                element,
                history: true
            })
        );
    };

    const updateSettings = (data: LinkSettingsFormData) => {
        // Skip update if nothing is change.
        if (data.newTab === newTab && data.href === href) {
            return;
        }
        const attrKey = `data.link`;
        const newElement: PbEditorElement = merge(element, attrKey, data);
        updateElement(newElement);
    };

    return (
        <Accordion title={"Link"} defaultValue={defaultAccordionValue}>
            <Form data={{ href, newTab }} onChange={updateSettings}>
                {({ Bind }) => (
                    <>
                        <Wrapper label={"URL"} containerClassName={classes.gridClass}>
                            <Bind
                                name={"href"}
                                validators={validation.create("url:allowRelative:allowHref")}
                            >
                                <DelayedOnChange>
                                    {props => (
                                        <InputField
                                            {...props}
                                            value={props.value || ""}
                                            onChange={props.onChange}
                                            placeholder={"https://webiny.com/blog"}
                                        />
                                    )}
                                </DelayedOnChange>
                            </Bind>
                        </Wrapper>
                        <Wrapper
                            label={"New tab"}
                            containerClassName={classes.gridClass}
                            rightCellClassName={classes.gridCellClass}
                        >
                            <Bind name={"newTab"}>
                                <Switch />
                            </Bind>
                        </Wrapper>
                    </>
                )}
            </Form>
        </Accordion>
    );
};

export default withActiveElement()(LinkSettingsComponent);
