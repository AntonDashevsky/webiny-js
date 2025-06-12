"use client";
import React from "react";
import {
    createComponent,
    createTextInput,
    createBooleanInput,
    createLongTextInput,
    createRichTextInput,
    createInput
} from "@webiny/app-website-builder/react/index.js";
import { Root } from "./components/Root";
import { TextWithDropzone } from "./components/TextWithDropzone";
import ProductRecommendations from "./components/ProductRecommendations";
import { ProductHighlight } from "./components/ProductHighlight";

const TextComponent = ({ text, flag }: { text: string; flag: boolean }) => (
    <p className={`p-6 text-wrap ${flag ? "font-bold" : ""}`}>{text}</p>
);

export const customComponents = [
    createComponent(Root, {
        name: "Webiny/Root",
        acceptsChildren: true,
        hideFromToolbar: true
    }),
    createComponent(TextComponent, {
        name: "Webiny/Text",
        label: "Text",
        group: "basic",
        image: "https://material-icons.github.io/material-icons/svg/text_fields/outline.svg",
        inputs: [
            createLongTextInput({
                name: "text",
                label: "Text",
                defaultValue: "Default text"
            }),
            createBooleanInput({
                name: "flag",
                label: "Popular post",
                description: "I make text bold. Or not...",
                defaultValue: false
            })
        ]
    }),
    createComponent(TextWithDropzone, {
        name: "Webiny/TextWithDropzone",
        label: "Text with Dropzone",
        group: "basic",
        acceptsChildren: true,
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "",
                required: true
            }),
            createRichTextInput({
                name: "content",
                label: "Content",
                required: true
            })
        ]
    }),
    createComponent(ProductRecommendations, {
        name: "Kibo/ProductRecommendations",
        label: "Product Recommendations",
        group: "ecommerce",
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "",
                required: true
            }),
            createInput({
                name: "productCodes",
                type: "KiboCommerceProductList",
                dataType: "text",
                list: true,
                renderer: "KiboCommerceProductList",
                label: "Products",
                fields: []
            })
        ]
    }),
    createComponent(ProductHighlight, {
        name: "Kibo/ProductHighlight",
        label: "Product Highlight",
        group: "ecommerce",
        inputs: [
            createInput({
                name: "productCode",
                type: "KiboCommerceProduct",
                dataType: "text",
                renderer: "KiboCommerceProduct",
                label: "Product",
                fields: []
            })
        ]
    })
];
