"use client";
import React from "react";
import {
    createComponent,
    createSlotInput,
    createTextInput,
    createBooleanInput,
    createLongTextInput,
    createRichTextInput,
    createElement
} from "@webiny/app-website-builder/react/index.js";
import { Root } from "./components/Root";
import { TextWithDropzone } from "./components/TextWithDropzone";
import ProductRecommendations from "./components/ProductRecommendations";
import { ProductHighlight } from "./components/ProductHighlight";
import { TwoColumns } from "./components/TwoColumns";
import Hero_1 from "@/webiny/components/Hero-1";

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
                label: "Text"
            }),
            createBooleanInput({
                name: "flag",
                label: "Popular post",
                description: "I make text bold. Or not..."
            })
        ],
        defaults: {
            inputs: {
                text: "Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet.",
                flag: true
            }
        }
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
                required: true
            }),
            createRichTextInput({
                name: "content",
                label: "Content",
                required: true
            })
        ]
    }),
    createComponent(TwoColumns, {
        name: "Webiny/TwoColumns",
        label: "Two Columns",
        group: "basic",
        inputs: [
            createTextInput({
                name: "title",
                label: "Title"
            }),
            createSlotInput({
                name: "leftColumn"
            }),
            createSlotInput({
                name: "rightColumn"
            })
        ],
        defaults: {
            inputs: {
                title: "Default Columns Title",
                leftColumn: [
                    createElement({
                        component: "Webiny/TextWithDropzone",
                        inputs: {
                            title: "Left Column Title"
                        },
                        styles: {
                            desktop: {
                                backgroundColor: "red",
                                marginTop: "20px"
                            }
                        }
                    })
                ],
                rightColumn: [
                    createElement({
                        component: "Webiny/TextWithDropzone",
                        inputs: {
                            title: "Right Column Title"
                        },
                        styles: {
                            desktop: {
                                backgroundColor: "blue",
                                marginTop: "20px"
                            }
                        }
                    })
                ]
            },
            styles: {
                desktop: {
                    padding: "20px",
                    backgroundColor: "#5c9a12"
                }
            }
        }
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
            createTextInput({
                name: "productCodes",
                list: true,
                renderer: "KiboCommerceProductList",
                label: "Products"
            }),
            createTextInput({
                name: "category",
                list: true,
                renderer: "KiboCommerceCategory",
                label: "Category"
            })
        ]
    }),
    createComponent(ProductHighlight, {
        name: "Kibo/ProductHighlight",
        label: "Product Highlight",
        group: "ecommerce",
        inputs: [
            createTextInput({
                name: "productCode",
                renderer: "KiboCommerceProduct",
                label: "Product"
            })
        ]
    }),
    createComponent(Hero_1, {
        name: "Webiny/Hero",
        label: "Hero #1"
    })
];
