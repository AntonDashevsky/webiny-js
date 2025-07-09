"use client";
import React from "react";
import {
    createComponent,
    createTextInput,
    createLongTextInput,
    createFileInput
} from "@webiny/website-builder-react";
import Hero_1 from "./components/Hero-1";

const SimpleTextComponent = ({
    inputs: { text, image }
}: {
    inputs: { text: string; image: any; children: any };
}) => {
    return (
        <div>
            <p>{text}</p>
            <img src={image.url} />{" "}
        </div>
    );
};

export const editorComponents = [
    createComponent(SimpleTextComponent, {
        name: "Webiny/SimpleText",
        label: "Simple Text",
        group: "basic",
        image: "https://material-icons.github.io/material-icons/svg/text_fields/outline.svg",
        acceptsChildren: true,
        inputs: [
            createLongTextInput({
                name: "text",
                label: "Text"
            }),
            createFileInput({
                name: "image",
                label: "Image",
                responsive: true,
                allowedFileTypes: ["image/*"]
            }),
            createTextInput({
                name: "product",
                label: "Product",
                renderer: "KiboCommerceProduct"
            }),
            createTextInput({
                name: "products",
                label: "Products",
                renderer: "KiboCommerceProductList"
            })
        ],
        defaults: {
            inputs: {
                text: "Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet."
            }
        }
    }),
    /*createComponent(ProductRecommendations, {
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
    }),*/
    createComponent(Hero_1, {
        name: "Webiny/Hero",
        label: "Hero #1"
    })
];
