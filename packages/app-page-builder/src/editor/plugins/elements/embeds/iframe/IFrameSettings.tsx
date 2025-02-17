import React from "react";
import { css } from "emotion";
import { merge } from "dot-prop-immutable";
import { Form } from "@webiny/form";
import { withActiveElement } from "~/editor/components/index.js";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { UpdateElementActionEvent } from "~/editor/recoil/actions/index.js";
import { PbEditorPageElementSettingsRenderComponentProps, PbEditorElement } from "~/types.js";
// Components
import Accordion from "../../../elementSettings/components/Accordion.js";
import Wrapper from "../../../elementSettings/components/Wrapper.js";
import InputField from "../../../elementSettings/components/InputField.js";

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

const isValidUrl = (urlString: string) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};

interface LinkSettingsFormData {
    url?: string;
}

interface LinkSettingsPropsType {
    element: PbEditorElement;
}

type LinkSettingsComponentProps = LinkSettingsPropsType &
    PbEditorPageElementSettingsRenderComponentProps;
const LinkSettingsComponent = ({ element, defaultAccordionValue }: LinkSettingsComponentProps) => {
    const handler = useEventActionHandler();

    const { url } = element.data?.["iframe"] || {};

    const updateElement = (element: PbEditorElement) => {
        handler.trigger(
            new UpdateElementActionEvent({
                element,
                history: true
            })
        );
    };

    const updateSettings = (data: LinkSettingsFormData) => {
        // Skip update if nothing is changed.
        if (data.url === url) {
            return;
        }

        if (data.url && !isValidUrl(data.url)) {
            return;
        }

        const attrKey = `data.iframe`;
        const newElement: PbEditorElement = merge(element, attrKey, data);
        updateElement(newElement);
    };

    return (
        <Accordion title={"Source"} defaultValue={defaultAccordionValue}>
            <Form data={{ url }} onChange={updateSettings}>
                {({ Bind }) => (
                    <>
                        <Wrapper label={"URL"} containerClassName={classes.gridClass}>
                            <Bind name={"url"}>
                                <DelayedOnChange>
                                    {props => (
                                        <InputField
                                            {...props}
                                            value={props.value || ""}
                                            onChange={props.onChange}
                                            placeholder={"https://iframe.source/goes/here"}
                                        />
                                    )}
                                </DelayedOnChange>
                            </Bind>
                        </Wrapper>
                    </>
                )}
            </Form>
        </Accordion>
    );
};

export default withActiveElement()(LinkSettingsComponent);
