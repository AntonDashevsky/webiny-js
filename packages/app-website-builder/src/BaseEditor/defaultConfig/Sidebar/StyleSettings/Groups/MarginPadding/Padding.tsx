import React from "react";
import { ValueSelector } from "./ValueSelector";
import { LinkedEditing } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/Groups/MarginPadding/LinkedEditing";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { useStyleValue } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/Groups/MarginPadding/useStyleValue";

const paddingUnitOptions = [
    {
        label: "px",
        value: "px"
    },
    {
        label: "%",
        value: "%"
    },
    {
        label: "em",
        value: "em"
    },
    {
        label: "rem",
        value: "rem"
    }
];

const widthUnitOptions = [
    {
        label: "vw",
        value: "vw"
    }
];

const heightUnitOptions = [
    {
        label: "vh",
        value: "vh"
    }
];

const heightOptions = [...paddingUnitOptions, ...heightUnitOptions];
const widthOptions = [...paddingUnitOptions, ...widthUnitOptions];

interface PaddingProps {
    elementId: string;
}

export const Padding = ({ elementId }: PaddingProps) => {
    const { onChange, onPreviewChange, metadata } = useStyles(elementId);

    const paddingTop = useStyleValue(elementId, "paddingTop");
    const paddingRight = useStyleValue(elementId, "paddingRight");
    const paddingBottom = useStyleValue(elementId, "paddingBottom");
    const paddingLeft = useStyleValue(elementId, "paddingLeft");

    const linked = metadata.get<boolean>("paddingLinkedEditing") ?? true;

    const onToggleLinkedEditing = (linked: boolean) => {
        onChange(({ styles, metadata }) => {
            if (linked) {
                const value = `${paddingTop.value}${paddingTop.unit}`;
                styles.set("paddingRight", value);
                styles.set("paddingBottom", value);
                styles.set("paddingLeft", value);
            }
            metadata.set("paddingLinkedEditing", linked);
        });
    };

    const onPaddingTopChange = (value: string) => {
        if (linked) {
            onChange(({ styles }) => {
                styles.set("paddingTop", value);
                styles.set("paddingRight", value);
                styles.set("paddingBottom", value);
                styles.set("paddingLeft", value);
            });
        } else {
            paddingTop.onChange(value);
        }
    };

    const onPaddingTopPreviewChange = (value: string) => {
        if (linked) {
            onPreviewChange(({ styles }) => {
                styles.set("paddingTop", value);
                styles.set("paddingRight", value);
                styles.set("paddingBottom", value);
                styles.set("paddingLeft", value);
            });
        } else {
            paddingTop.onChangePreview(value);
        }
    };

    return (
        <div className="wby-flex wby-flex-col wby-items-center wby-bg-neutral-muted wby-border-sm wby-border-neutral-muted wby-relative wby-rounded-md">
            <span className="wby-absolute wby-text-sm" style={{ top: 3, left: 5 }}>
                Padding
            </span>

            <LinkedEditing linked={linked} onToggle={onToggleLinkedEditing} />

            {/* Top Padding */}
            <ValueSelector
                {...paddingTop}
                units={heightOptions}
                onChange={onPaddingTopChange}
                onChangePreview={onPaddingTopPreviewChange}
            />

            {/* Center Row (Left Padding + Content + Right Padding) */}
            <div className="wby-flex wby-flex-row wby-items-center" style={{ width: 168 }}>
                <ValueSelector {...paddingLeft} units={widthOptions} disabled={linked} />
                <div
                    className="wby-flex wby-border-sm wby-border-neutral-muted wby-bg-neutral-light wby-rounded-md wby-items-center wby-justify-center"
                    style={{ width: 64, height: 30 }}
                >
                    -
                </div>
                <ValueSelector {...paddingRight} units={widthOptions} disabled={linked} />
            </div>

            {/* Bottom Padding */}
            <ValueSelector {...paddingBottom} units={heightOptions} disabled={linked} />
        </div>
    );
};
