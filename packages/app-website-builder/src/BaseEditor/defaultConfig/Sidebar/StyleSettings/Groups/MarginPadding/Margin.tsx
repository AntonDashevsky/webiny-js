import React from "react";

import { ValueSelector } from "./ValueSelector";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { LinkedEditing } from "./LinkedEditing";

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
    const { onChange, metadata } = useStyles(elementId);
    const linked = metadata.get<boolean>("marginLinkedEditing") ?? true;

    const onToggleLinkedEditing = (linked: boolean) => {
        onChange(({ metadata }) => {
            metadata.set("marginLinkedEditing", linked);
        });
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
                    elementId={elementId}
                    propertyName={"marginTop"}
                    options={heightOptions}
                />
            </div>

            <LinkedEditing linked={linked} onToggle={onToggleLinkedEditing} />

            {/* Middle Row (Left Margin + Padding Box + Right Margin) */}
            <div className="wby-flex wby-flex-row wby-items-center wby-w-full wby-h-[100px]">
                <ValueSelector
                    disabled={linked}
                    elementId={elementId}
                    propertyName={"marginLeft"}
                    options={widthOptions}
                />
                {children}
                <ValueSelector
                    disabled={linked}
                    elementId={elementId}
                    propertyName={"marginRight"}
                    options={widthOptions}
                />
            </div>

            {/* Bottom Margin */}
            <div className={"wby-flex wby-h-[40px]"}>
                <ValueSelector
                    disabled={linked}
                    elementId={elementId}
                    propertyName={"marginBottom"}
                    options={heightOptions}
                />
            </div>
        </div>
    );
};
