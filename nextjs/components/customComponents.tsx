import React from "react";
import { createComponent } from "@webiny/app-website-builder/react/index.js";
import { Root } from "@components/library/Root";
import Hero_1 from "./library/Hero-1";
import Contact_Sales from "./library/Contact_Sales";

const TextComponent = ({ text }: { text: string }) => <p className={"p-6"}>{text}</p>;

const BlockRefComponent = ({
    blockId,
    children
}: {
    blockId: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={"p-6"}>
            <h2>50-50 Block</h2>
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
        canHaveChildren: true,
        hideFromToolbar: true
    }),
    createComponent(TextComponent, {
        name: "Webiny/Text",
        label: "Text",
        group: "basic",
        image: "https://material-icons.github.io/material-icons/svg/text_fields/outline.svg",
        inputs: [
            {
                name: "text",
                type: "richText",
                defaultValue: "Default text"
            }
        ]
    }),
    createComponent(BlockRefComponent, {
        name: "Webiny/BlockRef",
        label: "Block Reference",
        group: "basic",
        canHaveChildren: true
    }),
    createComponent(Hero_1, {
        name: "Custom/Hero-1",
        label: "Hero #1",
        group: "ecommerce"
    }),
    createComponent(Contact_Sales, {
        name: "Custom/Sales-1",
        label: "Contact Sales #1"
    })
];
