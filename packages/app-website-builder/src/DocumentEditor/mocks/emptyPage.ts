import type { Document } from "~/sdk/types";

export default {
    properties: {
        title: "Page 1",
        path: "/page-1"
    },
    bindings: {
        root: {
            inputs: {
                children: {
                    type: "slot",
                    dataType: "string",
                    list: true,
                    static: []
                }
            }
        }
    },
    state: {},
    elements: {
        root: {
            type: "Webiny/Element",
            id: "root",
            component: {
                name: "Webiny/Root"
            }
        }
    }
} as any as Document;
