import React from "react";

import { ValueSelector } from "./ValueSelector";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { LinkedEditing } from "./LinkedEditing";
import { useStyleValue } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/Groups/MarginPadding/useStyleValue";

const autoOption = {
    label: "auto",
    value: "auto"
};

const marginUnitOptions = [
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

interface MarginProps {
    elementId: string;
    children: React.ReactNode;
}

const heightOptions = [...marginUnitOptions, ...heightUnitOptions, autoOption];
const widthOptions = [...marginUnitOptions, ...widthUnitOptions, autoOption];

export const Margin = ({ elementId, children }: MarginProps) => {
    const { onChange, onPreviewChange, metadata } = useStyles(elementId);

    const marginTop = useStyleValue(elementId, "marginTop");
    const marginRight = useStyleValue(elementId, "marginRight");
    const marginBottom = useStyleValue(elementId, "marginBottom");
    const marginLeft = useStyleValue(elementId, "marginLeft");

    const linked = metadata.get<boolean>("marginLinkedEditing") ?? true;

    const onToggleLinkedEditing = (linked: boolean) => {
        onChange(({ styles, metadata }) => {
            if (linked) {
                const value = `${marginTop.value}${marginTop.unit}`;
                styles.set("marginRight", value);
                styles.set("marginBottom", value);
                styles.set("marginLeft", value);
            }
            metadata.set("marginLinkedEditing", linked);
        });
    };

    const onMarginTopChange = (value: string) => {
        if (linked) {
            onChange(({ styles }) => {
                styles.set("marginTop", value);
                styles.set("marginRight", value);
                styles.set("marginBottom", value);
                styles.set("marginLeft", value);
            });
        } else {
            marginTop.onChange(value);
        }
    };

    const onMarginTopPreviewChange = (value: string) => {
        if (linked) {
            onPreviewChange(({ styles }) => {
                styles.set("marginTop", value);
                styles.set("marginRight", value);
                styles.set("marginBottom", value);
                styles.set("marginLeft", value);
            });
        } else {
            marginTop.onChangePreview(value);
        }
    };

    return (
        <div className="wby-flex wby-flex-col wby-items-center wby-rounded-md wby-relative">
            {/* Margin Label */}
            <span className="wby-absolute wby-text-sm" style={{ top: 5, left: 7 }}>
                Margin
            </span>

            {/* Top Margin */}
            <div className={"wby-flex wby-h-[40px]"}>
                <ValueSelector
                    {...marginTop}
                    units={heightOptions}
                    onChange={onMarginTopChange}
                    onChangePreview={onMarginTopPreviewChange}
                />
            </div>

            <LinkedEditing linked={linked} onToggle={onToggleLinkedEditing} />

            {/* Middle Row (Left Margin + Padding Box + Right Margin) */}
            <div className="wby-flex wby-flex-row wby-items-center wby-w-full wby-h-[100px]">
                <ValueSelector {...marginLeft} units={widthOptions} disabled={linked} />
                {children}
                <ValueSelector {...marginRight} units={widthOptions} disabled={linked} />
            </div>

            {/* Bottom Margin */}
            <div className={"wby-flex wby-h-[40px]"}>
                <ValueSelector {...marginBottom} units={heightOptions} disabled={linked} />
            </div>
        </div>
    );
};
