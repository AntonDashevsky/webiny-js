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
                    children: []
                }
            }
        }
    }
} as any as Document;
