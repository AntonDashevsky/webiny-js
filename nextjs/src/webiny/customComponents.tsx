"use client";
import React from "react";
import {
    createComponent,
    createSlotInput,
    createTextInput,
    createNumberInput,
    createBooleanInput,
    createLongTextInput,
    createLexicalInput,
    createElement,
    createObjectInput,
    createSelectInput,
    StyleSettings
} from "@webiny/website-builder-react";
import { Root } from "./components/Root";
import Hero_1 from "@/webiny/components/Hero-1";
import { type Column, Grid, GridColumn } from "./components/Grid";
import { createLexicalValue, LexicalComponent } from "./components/LexicalComponent";
import { Box } from "./components/Box";

const SimpleTextComponent = ({
    inputs: { text, image }
}: {
    inputs: { text: string; image: any };
}) => {
    return (
        <div>
            <p>{text}</p>
            <img src={image} />{" "}
        </div>
    );
};

export const customComponents = [
    createComponent(Root, {
        name: "Webiny/Root",
        label: "Main Content",
        acceptsChildren: true,
        hideFromToolbar: true
    }),
    createComponent(Box, {
        name: "Webiny/Box",
        label: "Box",
        group: "basic",
        image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z"/></svg>`,
        acceptsChildren: true,
        defaults: {
            styles: {
                paddingTop: "5px",
                paddingRight: "5px",
                paddingBottom: "5px",
                paddingLeft: "5px"
            }
        }
    }),
    createComponent(Grid, {
        name: "Webiny/Grid",
        label: "Grid",
        image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg>`,
        group: "basic",
        autoApplyStyles: false,
        inputs: [
            createTextInput({
                name: "gridLayout",
                label: "Grid Layout",
                renderer: "Webiny/GridLayout",
                onChange: ({ inputs, createElement }) => {
                    const rowColumnCount = inputs.gridLayout.split("-").length;
                    const columns = inputs.columns.length;

                    const remainder = columns % rowColumnCount;

                    if (remainder !== 0) {
                        const fullColumnCount = rowColumnCount * inputs.rowCount;
                        const toCreate =
                            columns > fullColumnCount ? remainder : rowColumnCount - remainder;

                        Array.from({ length: toCreate }).forEach(() => {
                            inputs.columns.push({
                                children: createElement({
                                    component: "Webiny/GridColumn"
                                })
                            });
                        });
                    }

                    inputs.rowCount = inputs.columns.length / rowColumnCount;
                }
            }),
            createNumberInput({
                name: "rowCount",
                label: "Row Count",
                defaultValue: 1,
                minValue: 1,
                onChange: ({ inputs, createElement }) => {
                    const gridLayout = inputs.gridLayout;
                    const columnCount = gridLayout.split("-").length;
                    const rowCount = Math.max(1, inputs.rowCount);
                    const columns = inputs.columns;
                    const rows: Column[][] = [];

                    // Chunk columns into rows
                    for (let i = 0; i < columns.length; i += columnCount) {
                        rows.push(columns.slice(i, i + columnCount));
                    }

                    if (rows.length > rowCount) {
                        inputs.columns = columns.slice(0, columnCount * rowCount);
                        return;
                    }

                    const createRows = Math.max(0, rowCount - rows.length);

                    if (createRows <= 0) {
                        return;
                    }

                    const newRows = Array.from({ length: createRows * columnCount }).map(() => {
                        return {
                            children: createElement({
                                component: "Webiny/GridColumn"
                            })
                        };
                    });

                    inputs.columns.push(...newRows);
                }
            }),
            createNumberInput({
                name: "rowGap",
                label: "Row Gap",
                defaultValue: 0,
                responsive: true,
                onChange: ({ inputs, styles }) => {
                    const rowGap = parseInt(inputs.rowGap);
                    if (isNaN(rowGap)) {
                        delete styles.rowGap;
                    } else {
                        styles.rowGap = `${inputs.rowGap}px`;
                    }
                }
            }),
            createNumberInput({
                name: "columnGap",
                label: "Column Gap",
                defaultValue: 0,
                responsive: true,
                onChange: ({ inputs, styles }) => {
                    const columnGap = parseInt(inputs.columnGap);
                    if (isNaN(columnGap)) {
                        delete styles.columnGap;
                    } else {
                        styles.columnGap = `${inputs.columnGap}px`;
                    }
                }
            }),
            createSelectInput({
                name: "stackAtBreakpoint",
                label: "Stack at breakpoint",
                options: [
                    { label: "Tablet", value: "tablet" },
                    { label: "Mobile", value: "mobile" }
                ]
            }),
            createBooleanInput({
                name: "reverseWhenStacked",
                label: "Reverse columns when stacked"
            }),
            createObjectInput({
                name: "columns",
                list: true,
                hideFromUi: true,
                fields: [
                    createSlotInput({
                        name: "children",
                        list: false,
                        components: ["Webiny/GridColumn"]
                    })
                ]
            })
        ],
        defaults: {
            inputs: {
                gridLayout: "6-6",
                columns: [
                    {
                        children: createElement({
                            component: "Webiny/GridColumn",
                            inputs: {
                                children: [
                                    createElement({
                                        component: "Webiny/Lexical"
                                    })
                                ]
                            }
                        })
                    },
                    {
                        children: createElement({
                            component: "Webiny/GridColumn",
                            inputs: {
                                children: [
                                    createElement({
                                        component: "Webiny/Lexical"
                                    })
                                ]
                            }
                        })
                    }
                ]
            },
            styles: {
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "stretch",
                width: "100%",
                marginTop: "0px",
                marginBottom: "0px",
                marginLeft: "0px",
                marginRight: "0px",
                paddingTop: "5px",
                paddingRight: "5px",
                paddingBottom: "5px",
                paddingLeft: "5px"
            }
        }
    }),
    createComponent(GridColumn, {
        name: "Webiny/GridColumn",
        label: "Column",
        image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M600-120q-33 0-56.5-23.5T520-200v-560q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600Zm0-640v560h160v-560H600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v560q0 33-23.5 56.5T360-120H200Zm0-640v560h160v-560H200Zm560 0H600h160Zm-400 0H200h160Z"/></svg>`,
        canDrag: false,
        canDelete: false,
        acceptsChildren: true,
        hideFromToolbar: true,
        hideStyleSettings: [StyleSettings.Visibility],
        defaults: {
            styles: {
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px"
            }
        }
    }),
    createComponent(LexicalComponent, {
        name: "Webiny/Lexical",
        label: "Rich Text",
        group: "basic",
        image: "https://material-icons.github.io/material-icons/svg/text_fields/outline.svg",
        inputs: [
            createLexicalInput({
                name: "content",
                label: "Content"
            })
        ],
        defaults: {
            inputs: {
                content: createLexicalValue(
                    "Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet."
                )
            }
        }
    }),
    createComponent(SimpleTextComponent, {
        name: "Webiny/SimpleText",
        label: "Simple Text",
        group: "basic",
        image: "https://material-icons.github.io/material-icons/svg/text_fields/outline.svg",
        inputs: [
            createLongTextInput({
                name: "text",
                label: "Text"
            }),
            createTextInput({
                name: "image",
                label: "Image",
                renderer: "Webiny/File",
                responsive: true
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
