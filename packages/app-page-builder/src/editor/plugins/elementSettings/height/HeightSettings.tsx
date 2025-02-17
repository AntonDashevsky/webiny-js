import React from "react";
import { css } from "emotion";
import { useRecoilValue } from "recoil";
import merge from "lodash/merge.js";
import set from "lodash/set.js";
import get from "lodash/get.js";
import { plugins } from "@webiny/plugins";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { Form, FormOnSubmit } from "@webiny/form";
import {
    PbEditorPageElementSettingsRenderComponentProps,
    PbEditorElement,
    PbEditorResponsiveModePlugin
} from "~/types.js";
import { useEventActionHandler } from "../../../hooks/useEventActionHandler.js";
import { UpdateElementActionEvent } from "../../../recoil/actions/index.js";
import {
    uiAtom,
    activeElementAtom,
    elementWithChildrenByIdSelector
} from "../../../recoil/modules/index.js";
import { applyFallbackDisplayMode } from "../elementSettingsUtils.js";
// Components
import { classes } from "../components/StyledComponents.js";
import Accordion from "../components/Accordion.js";
import Wrapper from "../components/Wrapper.js";
import SpacingPicker from "../components/SpacingPicker.js";
import { Validator } from "@webiny/validation/types.js";

const rightCellStyle = css({
    justifySelf: "end"
});

const spacingPickerStyle = css({
    width: "120px",
    "& .inner-wrapper": {
        display: "flex"
    }
});

const heightUnitOptions = [
    {
        label: "%",
        value: "%"
    },
    {
        label: "px",
        value: "px"
    },
    {
        label: "em",
        value: "em"
    },
    {
        label: "vh",
        value: "vh"
    },
    {
        label: "auto",
        value: "auto"
    }
];

enum HeightUnits {
    percentage = "%",
    px = "px",
    em = "em",
    vh = "vh",
    auto = "auto"
}

const validateHeight: Validator = (value: string | undefined) => {
    if (!value) {
        return true;
    }
    const parsedValue = parseInt(value);

    if (isNaN(parsedValue) && value !== HeightUnits.auto) {
        throw Error("Enter a valid number!");
    }

    if (parsedValue < 0) {
        throw Error("Height can't be negative!");
    }

    if (
        value.endsWith(HeightUnits.percentage) ||
        value.endsWith(HeightUnits.px) ||
        value.endsWith(HeightUnits.em) ||
        value.endsWith(HeightUnits.vh) ||
        value.endsWith(HeightUnits.auto)
    ) {
        return true;
    }

    throw Error("Specify a valid value!");
};

const DATA_NAMESPACE = "data.settings.height";

const Settings = ({ defaultAccordionValue }: PbEditorPageElementSettingsRenderComponentProps) => {
    const { displayMode } = useRecoilValue(uiAtom);
    const handler = useEventActionHandler();
    const activeElementId = useRecoilValue(activeElementAtom);
    const element = useRecoilValue(elementWithChildrenByIdSelector(activeElementId));
    const updateSettings: FormOnSubmit = async (data, form) => {
        const valid = await form.validate();
        if (!valid) {
            return null;
        }

        const newElement: PbEditorElement = merge(
            {},
            element,
            set({}, `${DATA_NAMESPACE}.${displayMode}`, data)
        );

        return handler.trigger(
            new UpdateElementActionEvent({
                element: newElement,
                history: true
            })
        );
    };

    const memoizedResponsiveModePlugin = React.useMemo(() => {
        return plugins
            .byType<PbEditorResponsiveModePlugin>("pb-editor-responsive-mode")
            .find(pl => pl.config.displayMode === displayMode);
    }, [displayMode]);

    const { config: activeDisplayModeConfig } = memoizedResponsiveModePlugin || {
        config: {
            displayMode: null,
            icon: null
        }
    };

    const settings = React.useMemo(() => {
        const fallbackValue = applyFallbackDisplayMode(displayMode, mode =>
            get(element, `${DATA_NAMESPACE}.${mode}`)
        );
        return get(element, `${DATA_NAMESPACE}.${displayMode}`, fallbackValue || { value: "100%" });
    }, [displayMode, element]);

    return (
        <Accordion
            title={"Height"}
            defaultValue={defaultAccordionValue}
            icon={
                <Tooltip content={`Changes will apply for ${activeDisplayModeConfig.displayMode}`}>
                    {activeDisplayModeConfig.icon}
                </Tooltip>
            }
        >
            <Form<{ value: unknown }>
                data={settings}
                onChange={(data, form) => {
                    if (!form) {
                        return;
                    }
                    return updateSettings(data, form);
                }}
            >
                {({ Bind }) => {
                    return (
                        <Wrapper
                            label={"Height"}
                            containerClassName={classes.simpleGrid}
                            rightCellClassName={rightCellStyle}
                        >
                            <Bind name={"value"} validators={validateHeight}>
                                {({ value, onChange, validation }) => (
                                    <SpacingPicker
                                        value={value || ""}
                                        onChange={onChange}
                                        validation={validation}
                                        options={heightUnitOptions}
                                        className={spacingPickerStyle}
                                        useDefaultStyle={false}
                                    />
                                )}
                            </Bind>
                        </Wrapper>
                    );
                }}
            </Form>
        </Accordion>
    );
};

export default React.memo(Settings);
