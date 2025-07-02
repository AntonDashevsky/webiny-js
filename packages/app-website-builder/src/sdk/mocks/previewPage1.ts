import { Document } from "~/sdk/types";

export default {
    properties: {
        title: "Preview Page #1",
        path: "/page-1"
    },
    bindings: {
        root: {
            inputs: {
                children: {
                    type: "slot",
                    dataType: "string",
                    list: true,
                    static: ["st3n62x27kywbokirxm7t"]
                }
            }
        },
        st3n62x27kywbokirxm7t: {
            inputs: {
                content: {
                    id: "onxq56jy4k3t64737w6qd",
                    static: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet. Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph-element","version":1,"textFormat":0,"textStyle":"","styles":[{"styleId":"paragraph1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
                    type: "richText",
                    dataType: "json",
                    list: false
                }
            },
            styles: {
                backgroundPosition: {
                    static: "center"
                },
                backgroundSize: {
                    static: "cover"
                },
                backgroundRepeat: {
                    static: "no-repeat"
                },
                backgroundImage: {
                    static: 'url("https://dc4s05sapah2w.cloudfront.net/files/685d33fd9dd930000222d931/9l9iafhh9-18.jpeg")'
                }
            },
            metadata: {
                "styles/backgroundImage/desktop": {
                    id: "685d33fd9dd930000222d931",
                    name: "9l9iafhh9-18.jpeg",
                    size: 204485,
                    mimeType: "image/jpeg",
                    url: "https://dc4s05sapah2w.cloudfront.net/files/685d33fd9dd930000222d931/9l9iafhh9-18.jpeg"
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
        },
        st3n62x27kywbokirxm7t: {
            type: "Webiny/Element",
            id: "st3n62x27kywbokirxm7t",
            parent: {
                id: "root",
                slot: "children"
            },
            component: {
                name: "Webiny/RichText"
            }
        }
    }
} as any as Document;
