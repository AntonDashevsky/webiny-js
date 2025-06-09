import React, { useCallback } from "react";
import { css } from "emotion";
import startCase from "lodash/startCase.js";
import { usePageElements } from "@webiny/app-page-builder-elements/hooks/usePageElements.js";
import { type PbEditorElement, type PbEditorPageElementSettingsRenderComponentProps } from "~/types.js";
// Components
import { IconPicker } from "@webiny/app-admin/components/IconPicker/index.js";
import { ICON_PICKER_SIZE } from "@webiny/app-admin/components/IconPicker/types.js";
import Accordion from "../../elementSettings/components/Accordion.js";
import { ContentWrapper } from "../../elementSettings/components/StyledComponents.js";
import Wrapper from "../../elementSettings/components/Wrapper.js";
import InputField from "../../elementSettings/components/InputField.js";
import SelectField from "../../elementSettings/components/SelectField.js";
import useUpdateHandlers from "../../elementSettings/useUpdateHandlers.js";
import { useActiveElement } from "~/editor/index.js";
import { useUpdateIconSettings } from "~/editor/plugins/elementSettings/hooks/useUpdateIconSettings.js";

const classes = {
    gridClass: css({
        "&.mdc-layout-grid": {
            padding: 0,
            margin: 0,
            marginBottom: 24
        }
    }),
    row: css({
        display: "flex",
        "& > div": {
            width: "50%",
            background: "beige"
        },

        "& .icon-picker-handler": {
            width: "100%",
            backgroundColor: "var(--webiny-theme-color-background)",
            "& svg": {
                width: 24,
                height: 24
            }
        },
        "& .color-picker-handler": {
            width: "100%",
            backgroundColor: "var(--webiny-theme-color-background)",
            "& > div": {
                width: "100%"
            }
        }
    }),
    rightCellStyle: css({
        justifySelf: "end"
    })
};

const ButtonSettings = ({
    defaultAccordionValue
}: PbEditorPageElementSettingsRenderComponentProps) => {
    const [element] = useActiveElement<PbEditorElement>();
    const { iconWidth, iconValue, onIconChange, onIconWidthChange, HiddenIconMarkup } =
        useUpdateIconSettings(element);

    const { theme } = usePageElements();
    const types = Object.keys(theme.styles.elements.button || {});
    const typesOptions = types.map(item => ({
        value: item,
        label: startCase(item)
    }));

    const defaultType = typesOptions[0].value;
    const { type = defaultType, icon } = element.data || {};

    const { getUpdateValue, getUpdatePreview } = useUpdateHandlers({
        element,
        dataNamespace: "data"
    });

    const updateType = useCallback(
        (value: string) => getUpdateValue("type")(value),
        [getUpdateValue]
    );
    const updateIconPosition = useCallback(
        (value: string) => getUpdateValue("icon.position")(value),
        [getUpdateValue]
    );
    const updateButtonText = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) =>
            getUpdateValue("buttonText")(event.target.value),
        [getUpdateValue]
    );
    const updateButtonTextPreview = useCallback(
        (value: string) => getUpdatePreview("buttonText")(value),
        [getUpdatePreview]
    );

    return (
        <Accordion title={"Button"} defaultValue={defaultAccordionValue}>
            <ContentWrapper direction={"column"}>
                <Wrapper label={"Type"} containerClassName={classes.gridClass}>
                    <SelectField value={type} onChange={updateType}>
                        {typesOptions.map(t => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </SelectField>
                </Wrapper>
                <Wrapper
                    label={"Icon"}
                    containerClassName={classes.gridClass}
                    rightCellClassName={classes.rightCellStyle}
                >
                    <IconPicker
                        size={ICON_PICKER_SIZE.SMALL}
                        value={iconValue}
                        onChange={onIconChange}
                        removable
                    />
                </Wrapper>
                <Wrapper
                    label={"Icon width"}
                    containerClassName={classes.gridClass}
                    leftCellSpan={8}
                    rightCellSpan={4}
                >
                    <InputField
                        placeholder={"Width"}
                        value={iconWidth}
                        onChange={onIconWidthChange}
                    />
                </Wrapper>
                <Wrapper
                    label={"Icon position"}
                    containerClassName={classes.gridClass}
                    leftCellSpan={8}
                    rightCellSpan={4}
                >
                    <SelectField value={icon?.position || "left"} onChange={updateIconPosition}>
                        <option value={"left"}>Left</option>
                        <option value={"right"}>Right</option>
                        <option value={"top"}>Top</option>
                        <option value={"bottom"}>Bottom</option>
                    </SelectField>
                </Wrapper>
                <Wrapper
                    label={"Label"}
                    containerClassName={classes.gridClass}
                    leftCellSpan={4}
                    rightCellSpan={8}
                >
                    <InputField
                        placeholder={"Label"}
                        value={element.data.buttonText}
                        onChange={updateButtonTextPreview}
                        onBlur={updateButtonText}
                    />
                </Wrapper>
                {/* Renders IconPicker.Icon for accessing its HTML without displaying it. */}
                <HiddenIconMarkup />
            </ContentWrapper>
        </Accordion>
    );
};

export default ButtonSettings;
