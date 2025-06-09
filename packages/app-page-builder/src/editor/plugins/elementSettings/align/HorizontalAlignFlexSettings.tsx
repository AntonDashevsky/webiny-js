import React, { useMemo } from "react";
import { css } from "emotion";
import classNames from "classnames";
import get from "lodash/get.js";
import set from "lodash/set.js";
import merge from "lodash/merge.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { IconButton } from "@webiny/ui/Button/index.js";
import { type PbEditorPageElementSettingsRenderComponentProps } from "~/types.js";
import { applyFallbackDisplayMode } from "../elementSettingsUtils.js";
// Components
import { ContentWrapper } from "../components/StyledComponents.js";
import Accordion from "../components/Accordion.js";
// Icons
import { ReactComponent as AlignLeftIcon } from "./icons/align_horizontal_left.svg";
import { ReactComponent as AlignCenterIcon } from "./icons/align_horizontal_center.svg";
import { ReactComponent as AlignRightIcon } from "./icons/align_horizontal_right.svg";
import { useDisplayMode } from "~/editor/hooks/useDisplayMode.js";
import { useActiveElement } from "~/editor/hooks/useActiveElement.js";
import { useUpdateElement } from "~/editor/hooks/useUpdateElement.js";

const classes = {
    activeIcon: css({
        "&.mdc-icon-button": {
            color: "var(--mdc-theme-primary)"
        }
    }),
    icon: css({
        "&.mdc-icon-button": {
            color: "var(--mdc-theme-text-primary-on-background)"
        }
    })
};

// Icons map for dynamic render
const icons: Record<string, React.ReactElement> = {
    "flex-start": <AlignLeftIcon />,
    center: <AlignCenterIcon />,
    "flex-end": <AlignRightIcon />
};

const iconDescriptions: Record<string, string> = {
    "flex-start": "Align left",
    center: "Align center",
    "flex-end": "Align right"
};
enum AlignmentsTypeEnum {
    FLEX_START = "flex-start",
    CENTER = "center",
    FLEX_END = "flex-end"
}

const alignments = Object.keys(icons);
const DATA_NAMESPACE = "data.settings.horizontalAlignFlex";

const HorizontalAlignFlexSettings = ({
    defaultAccordionValue = false
}: PbEditorPageElementSettingsRenderComponentProps) => {
    const { displayMode, config } = useDisplayMode();
    const [element] = useActiveElement();
    const updateElement = useUpdateElement();

    const propName = `${DATA_NAMESPACE}.${displayMode}`;

    const fallbackValue = useMemo(
        () =>
            applyFallbackDisplayMode(displayMode, mode =>
                get(element, `${DATA_NAMESPACE}.${mode}`)
            ),
        [displayMode]
    );

    const align = get(element, propName, fallbackValue || AlignmentsTypeEnum.CENTER);

    const onClick = (type: AlignmentsTypeEnum) => {
        const newElement = merge({}, element, set({}, propName, type));
        updateElement(newElement);
    };

    return (
        <Accordion
            title={"Horizontal align"}
            defaultValue={defaultAccordionValue}
            icon={
                <Tooltip content={`Changes will apply for ${config.displayMode}`}>
                    {config.icon}
                </Tooltip>
            }
        >
            <ContentWrapper>
                {alignments.map(type => (
                    <Tooltip key={type} content={iconDescriptions[type]} placement={"top"}>
                        <IconButton
                            className={classNames({
                                [classes.activeIcon]: align === type,
                                [classes.icon]: align !== type
                            })}
                            icon={icons[type]}
                            onClick={() => onClick(type as AlignmentsTypeEnum)}
                        />
                    </Tooltip>
                ))}
            </ContentWrapper>
        </Accordion>
    );
};

export default React.memo(HorizontalAlignFlexSettings);
