import React from "react";
import { css } from "emotion";
import { PbEditorElement, PbEditorPageElementSettingsRenderComponentProps } from "~/types.js";
// Components
import { IconPicker } from "@webiny/app-admin/components/IconPicker/index.js";
import { ICON_PICKER_SIZE } from "@webiny/app-admin/components/IconPicker/types.js";
import Accordion from "../../elementSettings/components/Accordion.js";
import Wrapper from "../../elementSettings/components/Wrapper.js";
import InputField from "../../elementSettings/components/InputField.js";
import { useActiveElement } from "~/editor/index.js";
import { useUpdateIconSettings } from "~/editor/plugins/elementSettings/hooks/useUpdateIconSettings.js";

const classes = {
    grid: css({
        "&.mdc-layout-grid": {
            padding: 0,
            marginBottom: 24
        }
    }),
    widthInputStyle: css({
        maxWidth: 60
    }),
    rightCellStyle: css({
        justifySelf: "end"
    })
};

const IconSettings = ({
    defaultAccordionValue
}: PbEditorPageElementSettingsRenderComponentProps) => {
    const [activeElement] = useActiveElement<PbEditorElement>();
    const { iconWidth, iconValue, onIconChange, onIconWidthChange, HiddenIconMarkup } =
        useUpdateIconSettings(activeElement);

    return (
        <Accordion title={"Icon"} defaultValue={defaultAccordionValue}>
            <>
                <Wrapper
                    containerClassName={classes.grid}
                    label={"Icon"}
                    rightCellClassName={classes.rightCellStyle}
                >
                    <IconPicker
                        size={ICON_PICKER_SIZE.SMALL}
                        value={iconValue}
                        onChange={onIconChange}
                    />
                </Wrapper>
                <Wrapper
                    containerClassName={classes.grid}
                    label={"Width"}
                    leftCellSpan={8}
                    rightCellSpan={4}
                    rightCellClassName={classes.rightCellStyle}
                >
                    <InputField
                        className={classes.widthInputStyle}
                        value={iconWidth}
                        onChange={onIconWidthChange}
                        placeholder="50"
                    />
                </Wrapper>
                <HiddenIconMarkup />
            </>
        </Accordion>
    );
};

export default React.memo(IconSettings);
