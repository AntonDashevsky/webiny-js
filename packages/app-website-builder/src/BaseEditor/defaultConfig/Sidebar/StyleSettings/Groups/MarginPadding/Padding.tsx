import React from "react";
import { ValueSelector } from "./ValueSelector";
import { LinkedEditing } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/Groups/MarginPadding/LinkedEditing";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";

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

interface PaddingProps {
    elementId: string;
}

export const Padding = ({ elementId }: PaddingProps) => {
    const { onChange, metadata } = useStyles(elementId);
    const linked = metadata.get<boolean>("paddingLinkedEditing") ?? true;

    const onToggleLinkedEditing = (linked: boolean) => {
        onChange(({ metadata }) => {
            metadata.set("paddingLinkedEditing", linked);
        });
    };

    return (
        <div className="wby-flex wby-flex-col wby-items-center wby-bg-neutral-muted wby-border-sm wby-border-neutral-muted wby-relative wby-rounded-md">
            <span className="wby-absolute wby-text-sm" style={{ top: 3, left: 5 }}>
                Padding
            </span>

            <LinkedEditing linked={linked} onToggle={onToggleLinkedEditing} />

            {/* Top Padding */}
            <ValueSelector
                elementId={elementId}
                options={[...paddingUnitOptions, ...heightUnitOptions]}
                propertyName={"paddingTop"}
            />

            {/* Center Row (Left Padding + Content + Right Padding) */}
            <div className="wby-flex wby-flex-row wby-items-center" style={{ width: 168 }}>
                <ValueSelector
                    elementId={elementId}
                    options={[...paddingUnitOptions, ...widthUnitOptions]}
                    propertyName={"paddingLeft"}
                    disabled={linked}
                />
                <div
                    className="wby-flex wby-border-sm wby-border-neutral-muted wby-bg-neutral-light wby-rounded-md wby-items-center wby-justify-center"
                    style={{ width: 64, height: 30 }}
                >
                    -
                </div>
                <ValueSelector
                    elementId={elementId}
                    options={[...paddingUnitOptions, ...widthUnitOptions]}
                    propertyName={"paddingRight"}
                    disabled={linked}
                />
            </div>

            {/* Bottom Padding */}
            <ValueSelector
                elementId={elementId}
                options={[...paddingUnitOptions, ...heightUnitOptions]}
                propertyName={"paddingBottom"}
                disabled={linked}
            />
        </div>
    );
};
