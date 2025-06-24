"use client";
import React from "react";
import {
    createComponent,
    createSlotInput,
    createTextInput,
    createNumberInput,
    createBooleanInput,
    createLongTextInput,
    createRichTextInput,
    createElement,
    createObjectInput
} from "@webiny/app-website-builder/react/index.js";
import { Root } from "./components/Root";
import { TextWithDropzone } from "./components/TextWithDropzone";
import ProductRecommendations from "./components/ProductRecommendations";
import { ProductHighlight } from "./components/ProductHighlight";
import { TwoColumns } from "./components/TwoColumns";
import Hero_1 from "@/webiny/components/Hero-1";
import { Column, Grid, GridColumn } from "./components/Grid";

const TextComponent = ({ text, flag }: { text: string; flag: boolean }) => (
    <p className={`text-wrap ${flag ? "font-bold" : ""}`}>{text}</p>
);

export const customComponents = [
    createComponent(Root, {
        name: "Webiny/Root",
        label: "Main Content",
        acceptsChildren: true,
        hideFromToolbar: true
    }),
    createComponent(Grid, {
        name: "Webiny/Grid",
        label: "Grid",
        group: "basic",
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
                                        component: "Webiny/Text"
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
                                        component: "Webiny/Text"
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
                flexFlow: "wrap",
                justifyContent: "flex-start",
                alignItems: "stretch",
                width: "100%",
                margin: "0px",
                padding: "5px"
            },
            overrides: {
                tablet: {
                    styles: {
                        backgroundColor: "blue"
                    }
                },
                mobile: {
                    styles: {
                        backgroundColor: "red"
                    }
                }
            }
        }
    }),
    createComponent(GridColumn, {
        name: "Webiny/GridColumn",
        label: "Column",
        canDrag: false,
        canDelete: false,
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
                flag: false
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
                padding: "20px",
                backgroundColor: "#5c9a12"
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
