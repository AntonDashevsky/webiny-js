import React from "react";
import { CompositionScope } from "@webiny/app-admin";
import { EditorConfig } from "~/BaseEditor";

interface PageEditorConfigProps {
    children: React.ReactNode;
}

const BasePageEditorConfig = ({ children }: PageEditorConfigProps) => {
    return (
        <CompositionScope name={"WebsiteBuilder/PageEditor"}>
            <EditorConfig priority={"secondary"}>{children}</EditorConfig>
        </CompositionScope>
    );
};

export const PageEditorConfig = Object.assign(BasePageEditorConfig, EditorConfig);
