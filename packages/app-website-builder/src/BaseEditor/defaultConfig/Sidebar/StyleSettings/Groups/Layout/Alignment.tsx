import React from "react";
import { ReactComponent as AlignToBottom } from "@webiny/icons/vertical_align_bottom.svg";
import { ReactComponent as AlignToTop } from "@webiny/icons/vertical_align_top.svg";
import { ReactComponent as CenterVertically } from "@webiny/icons/vertical_align_center.svg";
import { ReactComponent as AlignLeft } from "@webiny/icons/align_horizontal_left.svg";
import { ReactComponent as AlignRight } from "@webiny/icons/align_horizontal_right.svg";
import { ReactComponent as CenterHorizontally } from "@webiny/icons/align_horizontal_center.svg";
import { ReactComponent as FillWidth } from "@webiny/icons/arrow_range.svg";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { InheritanceLabel } from "../../../InheritanceLabel";
import { IconButton } from "./IconButton";

/**
 * Alignment is controlled with margin and display: flex.
 * -----
 * Align to the left => margin-right: auto;
 * Align to the right => margin-left: auto;
 * Center horizontally => margin-left: auto; margin-right: auto;
 * Fill width: unset margin-left and margin-right.
 * -----
 * Align to the top => margin-bottom: auto;
 * Align to the bottom => margin-top: auto;
 * Center vertically => margin-top: auto; margin-bottom: auto;
 */
export const Alignment = ({ elementId }: { elementId: string }) => {
    const { onChange, inheritanceMap } = useStyles(elementId);

    /**
     * Horizontal alignment
     */
    const onAlignLeft = () => {
        onChange(({ styles }) => {
            styles.set("marginRight", "auto");
            if (styles.get("marginLeft") === "auto") {
                styles.unset("marginLeft");
            }
        });
    };

    const onAlignRight = () => {
        onChange(({ styles }) => {
            styles.set("marginLeft", "auto");
            if (styles.get("marginRight") === "auto") {
                styles.unset("marginRight");
            }
        });
    };

    const onCenterHorizontally = () => {
        onChange(({ styles }) => {
            styles.set("marginLeft", "auto");
            styles.set("marginRight", "auto");
        });
    };

    const onFillWidth = () => {
        onChange(({ styles }) => {
            styles.set("width", "100%");
            styles.unset("maxWidth");
            styles.unset("marginLeft");
            styles.unset("marginRight");
        });
    };

    /**
     * Vertical alignment
     */
    const onAlignTop = () => {
        onChange(({ styles }) => {
            styles.set("marginBottom", "auto");
            if (styles.get("marginTop") === "auto") {
                styles.unset("marginTop");
            }
        });
    };

    const onCenterVertically = () => {
        onChange(({ styles }) => {
            styles.set("marginTop", "auto");
            styles.set("marginBottom", "auto");
        });
    };

    const onAlignBottom = () => {
        onChange(({ styles }) => {
            styles.set("marginTop", "auto");
            if (styles.get("marginBottom") === "auto") {
                styles.unset("marginBottom");
            }
        });
    };

    const onReset = () => {
        onChange(({ styles }) => {
            styles.unset("marginTop");
            styles.unset("marginRight");
            styles.unset("marginBottom");
            styles.unset("marginLeft");
        });
    };

    return (
        <div>
            <InheritanceLabel text={"Align"} onReset={onReset} isOverridden={false} />
            <div className={"wby-flex wby-flex-row wby-w-full wby-justify-between"}>
                {/* Horizontal Alignment */}
                <IconButton
                    icon={<FillWidth />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onFillWidth}
                    tooltip={"Full width"}
                />
                <IconButton
                    icon={<AlignLeft />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onAlignLeft}
                    tooltip={"Align to the left side"}
                />
                <IconButton
                    icon={<CenterHorizontally />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onCenterHorizontally}
                    tooltip={"Center horizontally"}
                />
                <IconButton
                    icon={<AlignRight />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onAlignRight}
                    tooltip={"Align to the right side"}
                />
                {/* Vertical Alignment */}
                <IconButton
                    icon={<AlignToTop />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onAlignTop}
                    tooltip={"Align to the top side"}
                />
                <IconButton
                    icon={<CenterVertically />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onCenterVertically}
                    tooltip={"Center vertically"}
                />
                <IconButton
                    icon={<AlignToBottom />}
                    size={"md"}
                    variant={"ghost"}
                    onClick={onAlignBottom}
                    tooltip={"Align to the bottom side"}
                />
            </div>
        </div>
    );
};
