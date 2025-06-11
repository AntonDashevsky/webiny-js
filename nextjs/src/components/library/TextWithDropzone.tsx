import React from "react";
import { LexicalHtmlRenderer } from "@webiny/lexical-editor";

export const TextWithDropzone = ({
    title,
    content,
    children
}: {
    title: string;
    content: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={"p-6"}>
            <h2>{title || "Split Block"}</h2>
            <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: 5 }}>
                <div style={{ flexBasis: "50%", textAlign: "justify" }}>
                    <LexicalHtmlRenderer value={content} theme={{}} />
                </div>
                <div style={{ flexBasis: "50%" }}>{children}</div>
            </div>
        </div>
    );
};
