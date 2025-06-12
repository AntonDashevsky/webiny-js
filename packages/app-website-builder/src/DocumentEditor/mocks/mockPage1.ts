import type { Document } from "~/sdk/types";

export default {
    properties: {
        id: "12345678",
        title: "Page 1",
        path: "/page-1"
    },
    state: {
        list: [
            { text: "Fist dynamic text", popular: false },
            { text: "Second dynamic text", popular: true }
        ]
    },
    bindings: {
        a4q8yakhqs: {
            "component.inputs.productCode": [
                {
                    type: "static",
                    value: "ACC1"
                }
            ]
        },
        c005jd8kzs: {
            "component.inputs.title": [
                {
                    type: "static",
                    value: "Products of the Month"
                }
            ],
            "component.inputs.productCodes": [
                {
                    type: "static",
                    value: ["SHOE12", "ACC1", "BIKE3", "TOP13"]
                }
            ]
        },
        dvt6dzeuuh: {
            "component.inputs.title": [
                {
                    type: "static",
                    value: "Product highlight"
                }
            ],
            "component.inputs.content": [
                {
                    type: "static",
                    value: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"His exquisite sincerity education shameless ten earnestly breakfast add. So we me unknown as improve hastily sitting forming. Especially favourable compliment but thoroughly unreserved saw she themselves. Sufficient impossible him may ten insensible put continuing. Oppose exeter income simple few joy cousin but twenty. Scale began quiet up short wrong in in. Sportsmen shy forfeited engrossed may can.","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph-element","version":1,"textFormat":0,"textStyle":"","styles":[{"styleId":"paragraph1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
                }
            ]
        },
        mldehii9hy: {
            "component.inputs.productCode": [
                {
                    type: "static",
                    value: "TOP3"
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
                    children: ["c005jd8kzs", "dvt6dzeuuh"]
                }
            }
        },
        c005jd8kzs: {
            id: "c005jd8kzs",
            type: "Webiny/Element",
            parent: {
                id: "root",
                slot: "children"
            },
            component: {
                name: "Kibo/ProductRecommendations",
                inputs: {}
            }
        },
        dvt6dzeuuh: {
            id: "dvt6dzeuuh",
            type: "Webiny/Element",
            parent: {
                id: "root",
                slot: "children"
            },
            component: {
                name: "Webiny/TextWithDropzone",
                inputs: {
                    children: ["mldehii9hy"]
                }
            }
        },
        mldehii9hy: {
            id: "mldehii9hy",
            type: "Webiny/Element",
            parent: {
                id: "dvt6dzeuuh",
                slot: "children"
            },
            component: {
                name: "Kibo/ProductHighlight",
                inputs: {}
            }
        }
    }
} as any as Document;
