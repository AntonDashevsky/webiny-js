import React, { useEffect, useState } from "react";
import { css } from "emotion";
import { Bind } from "@webiny/form";
import { type PbEditorElement, type PbElement, type PbPageElementActionTypePlugin } from "~/types.js";
import Wrapper from "../../components/Wrapper.js";
import SelectField from "../../components/SelectField.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { getElementsPropertiesValues } from "~/render/utils.js";
import { withActiveElement } from "~/editor/components/index.js";

const classes = {
    gridClass: css({
        "&.mdc-layout-grid": {
            padding: 0,
            marginBottom: 24
        }
    })
};

const ScrollToElementForm = withActiveElement()(({ element }: { element: PbEditorElement }) => {
    const { getElementTree } = useEventActionHandler();
    const [elementIds, setElementIds] = useState<Array<string>>([""]);

    const actionType = element.data.action?.actionType;

    useEffect(() => {
        const getElementIds = async () => {
            const tree = (await getElementTree()) as PbElement;
            setElementIds(getElementsPropertiesValues(tree, "data.settings.property.id"));
        };

        if (actionType === "scrollToElement") {
            getElementIds();
        }
    }, [actionType]);

    return (
        <>
            <Bind name={"scrollToElement"}>
                {({ value, onChange }) => (
                    <Wrapper label={"Element ID"} containerClassName={classes.gridClass}>
                        <SelectField value={value} onChange={onChange} placeholder={"None"}>
                            {elementIds.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </SelectField>
                    </Wrapper>
                )}
            </Bind>
        </>
    );
});

export const scrollToElementActionType: PbPageElementActionTypePlugin = {
    type: "pb-page-element-action-type",
    actionType: {
        name: "scrollToElement",
        label: "Scroll to element",
        element: <ScrollToElementForm />
    }
};
