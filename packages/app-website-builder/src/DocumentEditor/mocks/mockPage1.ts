import type { Document } from "~/sdk/types";

export default {
    properties: {
        title: "Page 1",
        path: "/page-1"
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
                name: "Webiny/Text",
                inputs: {
                    text: `Nunc maximus elementum luctus. In hac habitasse platea dictumst. Vivamus
                    porttitor quam nec ante tempor, sit amet tristique dui accumsan. Suspendisse
                    egestas molestie sagittis. Nulla facilisi. Vestibulum laoreet nibh ipsum, ut
                    bibendum libero tempor sed. Vestibulum id nunc at erat scelerisque tempor eget
                    id augue. Mauris congue sed dui vel posuere.`
                }
            },
            styles: {
                large: {
                    color: "#006700",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    flexShrink: 0,
                    boxSizing: "border-box",
                    marginTop: "20px",
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
