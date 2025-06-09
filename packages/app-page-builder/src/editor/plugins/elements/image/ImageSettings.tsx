import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { css } from "emotion";
import { activeElementAtom, elementByIdSelector } from "~/editor/recoil/modules/index.js";
import { type PbEditorElement, type PbEditorPageElementSettingsRenderComponentProps } from "~/types.js";
// Components
import Accordion from "~/editor/plugins/elementSettings/components/Accordion.js";
import Wrapper from "~/editor/plugins/elementSettings/components/Wrapper.js";
import InputField from "~/editor/plugins/elementSettings/components/InputField.js";
import SpacingPicker from "~/editor/plugins/elementSettings/components/SpacingPicker.js";
import useUpdateHandlers from "~/editor/plugins/elementSettings/useUpdateHandlers.js";
import { justifySelfEndStyle } from "~/editor/plugins/elementSettings/components/StyledComponents.js";
import {
    WIDTH_UNIT_OPTIONS,
    HEIGHT_UNIT_OPTIONS
} from "~/editor/plugins/elementSettings/elementSettingsUtils.js";
import SelectField from "~/editor/plugins/elementSettings/components/SelectField.js";

const classes = {
    grid: css({
        "&.mdc-layout-grid": {
            padding: 0,
            marginBottom: 24
        }
    })
};

const spacingPickerStyle = css({
    width: "120px",
    "& .inner-wrapper": {
        display: "flex"
    }
});

const ImageSettings = ({
    defaultAccordionValue = false
}: PbEditorPageElementSettingsRenderComponentProps) => {
    const activeElementId = useRecoilValue(activeElementAtom) as string;
    const element = useRecoilValue(elementByIdSelector(activeElementId)) as PbEditorElement;
    const {
        data: { image }
    } = element;

    const { getUpdateValue } = useUpdateHandlers({ element, dataNamespace: "data.image" });

    const updateTitle = useCallback((value: string) => getUpdateValue("title")(value), []);
    const updateWidth = useCallback((value: string | number) => getUpdateValue("width")(value), []);
    const updateHeight = useCallback(
        (value: string | number) => getUpdateValue("height")(value),
        []
    );
    const updateHtmlTag = useCallback((value: string) => getUpdateValue("htmlTag")(value), []);

    return (
        <Accordion title={"Image"} defaultValue={defaultAccordionValue}>
            <>
                <Wrapper containerClassName={classes.grid} label={"Title"}>
                    <InputField value={image?.title || ""} onChange={updateTitle} />
                </Wrapper>
                <Wrapper
                    containerClassName={classes.grid}
                    label={"Width"}
                    rightCellClassName={justifySelfEndStyle}
                >
                    <SpacingPicker
                        value={(image?.width as string) || ""}
                        onChange={updateWidth}
                        options={WIDTH_UNIT_OPTIONS}
                        useDefaultStyle={false}
                        className={spacingPickerStyle}
                    />
                </Wrapper>
                <Wrapper
                    containerClassName={classes.grid}
                    label={"Height"}
                    rightCellClassName={justifySelfEndStyle}
                >
                    <SpacingPicker
                        value={(image?.height as string) || ""}
                        onChange={updateHeight}
                        options={HEIGHT_UNIT_OPTIONS}
                        useDefaultStyle={false}
                        className={spacingPickerStyle}
                    />
                </Wrapper>
                <Wrapper
                    label={"HTML Tag"}
                    containerClassName={classes.grid}
                    leftCellSpan={4}
                    rightCellSpan={8}
                >
                    <SelectField value={image?.htmlTag || "img"} onChange={updateHtmlTag}>
                        <option value={"auto"}>{"Auto-detect"}</option>
                        <option value={"img"}>{"<img>"}</option>
                        <option value={"object"}>{"<object>"} (for SVGs)</option>
                    </SelectField>
                </Wrapper>
            </>
        </Accordion>
    );
};
export default React.memo(ImageSettings);
