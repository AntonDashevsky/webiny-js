import React from "react";
import { useDocumentSlots } from "~/components/SlotsProvider";
import type { ComponentProps } from "~/types";
import { contentSdk } from "@webiny/app-website-builder/sdk";

type SlotComponentProps = ComponentProps<{
    name: string;
}>;

export const SlotComponent = ({ inputs }: SlotComponentProps) => {
    const isEditing = contentSdk.isEditing();
    const slots = useDocumentSlots();
    const element = slots[inputs.name] ?? null;
    if (!element && isEditing) {
        return <SlotPlaceholder name={inputs.name} />;
    }
    return <>{element}</>;
};

const SlotPlaceholder = ({ name }: { name: string }) => {
    const slotName = name ? (
        <>
            &nbsp;<strong>{name}</strong>&nbsp;
        </>
    ) : (
        <>&nbsp;</>
    );
    return (
        <div
            style={{
                display: "flex",
                height: "100px",
                backgroundColor: "#f4f4f4",
                justifyContent: "center",
                alignItems: "center",
                fill: "#ffffff"
            }}
        >
            This is a placeholder for{slotName}content coming from your frontend app.
        </div>
    );
};
