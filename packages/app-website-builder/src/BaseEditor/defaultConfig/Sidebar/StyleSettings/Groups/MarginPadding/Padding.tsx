import React from "react";
import { ValueSelector } from "./ValueSelector";

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
    return (
        <div className="wby-flex wby-flex-col wby-items-center wby-bg-neutral-muted wby-border-sm wby-border-neutral-muted wby-relative wby-rounded-md">
            <span className="wby-absolute wby-text-sm" style={{ top: 3, left: 5 }}>
                Padding
            </span>

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
                />
            </div>

            {/* Bottom Padding */}
            <ValueSelector
                elementId={elementId}
                options={[...paddingUnitOptions, ...heightUnitOptions]}
                propertyName={"paddingBottom"}
            />
        </div>
    );
};
