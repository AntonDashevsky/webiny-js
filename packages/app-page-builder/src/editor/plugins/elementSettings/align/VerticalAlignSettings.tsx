import React, { useMemo } from "react";
import { css } from "emotion";
import classNames from "classnames";
import get from "lodash/get.js";
import set from "lodash/set.js";
import merge from "lodash/merge.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { IconButton } from "@webiny/ui/Button/index.js";
import { PbEditorElement, PbEditorPageElementSettingsRenderComponentProps } from "~/types.js";
import { applyFallbackDisplayMode } from "../elementSettingsUtils.js";
// Components
import { ContentWrapper } from "../components/StyledComponents.js";
import Accordion from "../components/Accordion.js";
// Icons
import { ReactComponent as AlignTopIcon } from "./icons/align_vertical_top.svg";
import { ReactComponent as AlignCenterIcon } from "./icons/align_vertical_center.svg";
import { ReactComponent as AlignBottomIcon } from "./icons/align_vertical_bottom.svg";
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

enum AlignTypesEnum {
    start = "flex-start",
    center = "center",
    end = "flex-end"
}

// Icons map for dynamic render
const icons: Record<string, React.ReactElement> = {
    [AlignTypesEnum.start]: <AlignTopIcon />,
    [AlignTypesEnum.center]: <AlignCenterIcon />,
    [AlignTypesEnum.end]: <AlignBottomIcon />
};
const alignments = Object.keys(icons);

const iconDescriptions: Record<string, string> = {
    [AlignTypesEnum.start]: "Align top",
    [AlignTypesEnum.center]: "Align center",
    [AlignTypesEnum.end]: "Align bottom"
};

const DATA_NAMESPACE = "data.settings.verticalAlign";

const VerticalAlignSettings = ({
    defaultAccordionValue
}: PbEditorPageElementSettingsRenderComponentProps) => {
    const { displayMode, config } = useDisplayMode();
    const propName = `${DATA_NAMESPACE}.${displayMode}`;
    const [element] = useActiveElement<PbEditorElement>();
    const updateElement = useUpdateElement();

    const fallbackValue = useMemo(
        () =>
            applyFallbackDisplayMode(displayMode, mode =>
                get(element, `${DATA_NAMESPACE}.${mode}`)
            ),
        [displayMode]
    );
    const align = get(element, propName, fallbackValue || AlignTypesEnum.center);

    const onClick = (type: AlignTypesEnum) => {
        const newElement = merge({}, element, set({}, propName, type));
        updateElement(newElement);
    };

    return (
        <Accordion
            title={"Vertical align"}
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
                            onClick={() => onClick(type as AlignTypesEnum)}
                        />
                    </Tooltip>
                ))}
            </ContentWrapper>
        </Accordion>
    );
};

export default React.memo(VerticalAlignSettings);
