"use client";
import React from "react";
import {
    createComponent,
    createDateInput,
    createTagsInput,
    createTextInput,
    createBooleanInput,
    createLongTextInput,
    createRichTextInput
} from "@webiny/app-website-builder/react/index.js";
import { Root } from "@components/library/Root";
import Hero_1 from "./library/Hero-1";
import Contact_Sales from "./library/Contact_Sales";
import SingleColumnWithImages from "@components/library/SingleColumnWithImages";
import SingleColumn from "./library/SingleColumn";
import Stats from "@components/library/Stats";
import { TextWithDropzone } from "@components/library/TextWithDropzone";

const TextComponent = ({ text, flag }: { text: string; flag: boolean }) => (
    <p className={`p-6 ${flag ? "font-bold" : ""}`}>{text}</p>
);


export const customComponents = [
    createComponent(Root, {
        name: "Webiny/Root",
        acceptsChildren: true,
        hideFromToolbar: true
    }),
    createComponent(Root, {
        name: "Webiny/Columns",
        acceptsChildren: true,
        defaultStyles: {
            desktop: {

            }
        }
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
    createComponent(Hero_1, {
        name: "Ecommerce/Hero-1",
        label: "Hero #1",
        group: "ecommerce"
    }),
    createComponent(Contact_Sales, {
        name: "Ecommerce/Sales-1",
        label: "Contact Sales #1",
        group: "ecommerce"
    }),
    createComponent(SingleColumnWithImages, {
        name: "Blog/SingleColumnWithImages",
        label: "Single Column With Images"
    }),
    createComponent(SingleColumn, {
        name: "Blog/SingleColumn",
        label: "Single Column",
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "",
                required: true
            }),
            /*createTagsInput({
                name: "tags",
                label: "Tags",
                defaultValue: [],
                required: true
            }),
            createDateInput({
                name: "publishedOn",
                label: "Published on",
                defaultValue: "",
                required: true
            })*/
        ]
    }),
    createComponent(Stats, {
        name: "Kibo/Stats",
        label: "Stats #1",
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "",
                required: true
            })
        ]
    })
];
