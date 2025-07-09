"use client";
import { createFileInput, createSelectInput } from "@webiny/app-website-builder/sdk";
import { createComponent } from "~/createComponent";
import { ImageComponent } from "./Image";

export const Image = createComponent(ImageComponent, {
    name: "Webiny/Image",
    label: "Image",
    group: "basic",
    image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>`,
    autoApplyStyles: false,
    inputs: [
        createFileInput({
            name: "image",
            label: "Image",
            description: "Select an image",
            allowedFileTypes: ["image/*"]
        }),
        createSelectInput({
            name: "htmlTag",
            label: "HTML Tag",
            defaultValue: "auto-detect",
            showResetAction: false,
            options: [
                {
                    label: "Auto-detect",
                    value: "auto-detect"
                },
                {
                    label: "<img>",
                    value: "img"
                },
                {
                    label: "<object> (for SVGs)",
                    value: "object"
                }
            ]
        })
    ],
    defaults: {
        styles: {
            width: "100%"
        }
    }
});
