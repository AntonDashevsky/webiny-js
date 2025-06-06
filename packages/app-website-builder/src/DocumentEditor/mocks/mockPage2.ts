import type { Document } from "~/sdk/types";

export default {
    properties: {
        id: "12345678",
        title: "Page 2",
        path: "/page-2"
    },
    bindings: {
        "4ETOAnHNei7": {
            "component.inputs.text": [
                {
                    type: "static",
                    value: `Nunc maximus elementum luctus. In hac habitasse platea dictumst. Vivamus
                    porttitor quam nec ante tempor, sit amet tristique dui accumsan. Suspendisse
                    egestas molestie sagittis. Nulla facilisi. Vestibulum laoreet nibh ipsum, ut
                    bibendum libero tempor sed. Vestibulum id nunc at erat scelerisque tempor eget
                    id augue. Mauris congue sed dui vel posuere1.`
                }
            ]
        }
    },
    elements: {
        root: {
            type: "Webiny/Element",
            id: "root",
            component: {
                name: "Webiny/Root",
                inputs: {
                    children: ["4ETOAnHNei7", "2B6ROAnHFao3"]
                }
            }
        },
        "4ETOAnHNei7": {
            type: "Webiny/Element",
            id: "4ETOAnHNei7",
            parent: {
                id: "root",
                slot: "children"
            },
            component: {
                name: "Webiny/Text"
            },
            styles: {
                desktop: {
                    color: "#006700",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    flexShrink: 0,
                    boxSizing: "border-box",
                    lineHeight: "normal",
                    height: "auto"
                },
                mobilePortrait: {
                    color: "#ea2a73",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    flexShrink: 0,
                    boxSizing: "border-box",
                    lineHeight: "normal",
                    height: "auto"
                }
            }
        },
        "2B6ROAnHFao3": {
            type: "Webiny/Element",
            id: "2B6ROAnHFao3",
            parent: {
                id: "root",
                slot: "children"
            },
            component: {
                name: "Webiny/BlockRef",
                inputs: {
                    blockId: "B6ROAnHFao3",
                    inputs: {}
                }
            }
        }
    }
} as any as Document;
