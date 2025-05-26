import React from "react";

interface DropLineProps {
    top: number;
    visible: boolean;
    dimmed: boolean;
}

export function DropLine({ top, visible, dimmed }: DropLineProps) {
    return (
        <div
            className={"wby-absolute wby-bg-primary-default wby-left-0 wby-right-0"}
            style={{
                top,
                height: 4,
                zIndex: 10,
                visibility: visible ? "visible" : "hidden",
                opacity: dimmed ? 0.5 : 1
            }}
        />
    );
}
