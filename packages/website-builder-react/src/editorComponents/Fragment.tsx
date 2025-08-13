import React from "react";
import { contentSdk } from "@webiny/website-builder-sdk";
import { useDocumentFragments } from "~/components/FragmentsProvider.js";
import type { ComponentProps } from "~/types.js";

type FragmentComponentProps = ComponentProps<{
    name: string;
}>;

export const FragmentComponent = ({ inputs }: FragmentComponentProps) => {
    const isEditing = contentSdk.isEditing();
    const fragments = useDocumentFragments();
    const element = fragments[inputs.name] ?? null;
    if (!element && isEditing) {
        return <FragmentPlaceholder name={inputs.name} />;
    }
    return <>{element}</>;
};

const FragmentPlaceholder = ({ name }: { name: string }) => {
    const fragmentName = name ? (
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
            This is a placeholder for{fragmentName}content coming from your frontend app.
        </div>
    );
};
