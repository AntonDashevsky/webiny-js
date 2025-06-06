"use client";
import React from "react";
import {
    createComponent,
    createDateInput,
    createTagsInput,
    createTextInput,
    createBooleanInput,
    createLongTextInput
} from "@webiny/app-website-builder/react/index.js";
import { Root } from "@components/library/Root";
import Hero_1 from "./library/Hero-1";
import Contact_Sales from "./library/Contact_Sales";
import SingleColumnWithImages from "@components/library/SingleColumnWithImages";
import SingleColumn from "./library/SingleColumn";
import Stats from "@components/library/Stats";

const TextComponent = ({ text, flag }: { text: string; flag: boolean }) => (
    <p className={`p-6 ${flag ? "font-bold" : ""}`}>{text}</p>
);

const BlockRefComponent = ({
    blockId,
    title,
    children
}: {
    title: string;
    blockId: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={"p-6"}>
            <h2>{title || "Split Block"}</h2>
            <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: 5 }}>
                <div style={{ flexBasis: "50%", textAlign: "justify" }}>
                    Nunc maximus elementum luctus. In hac habitasse platea dictumst. Vivamus
                    porttitor quam nec ante tempor, sit amet tristique dui accumsan. Suspendisse
                    egestas molestie sagittis. Nulla facilisi. Vestibulum laoreet nibh ipsum, ut
                    bibendum libero tempor sed. Vestibulum id nunc at erat scelerisque tempor eget
                    id augue. Mauris congue sed dui vel posuere.
                </div>
                <div style={{ flexBasis: "50%" }}>{children}</div>
            </div>
        </div>
    );
};

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
    createComponent(BlockRefComponent, {
        name: "Webiny/BlockRef",
        label: "Block Reference",
        group: "basic",
        acceptsChildren: true,
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "",
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
