import { Document } from "~/sdk/types";

export default {
    properties: {
        title: "Published Page 1",
        path: "/page-1"
    },
    bindings: {
        root: {
            inputs: {
                children: {
                    type: "slot",
                    dataType: "string",
                    list: true,
                    static: ["a3joeguclfb0pws7iy3z6", "use09dto6o4czn4liae6c"]
                }
            }
        },
        use09dto6o4czn4liae6c: {
            inputs: {
                gridLayout: {
                    id: "or19abbmfpstmyomk2by8",
                    static: "6-6",
                    type: "text",
                    dataType: "text",
                    list: false
                },
                rowCount: {
                    id: "xeflqnpqmvx3z54k4ff24",
                    static: 1,
                    type: "number",
                    dataType: "number",
                    list: false
                },
                rowGap: {
                    id: "jb0m4zd3edtruku8ebna0",
                    static: 0,
                    type: "number",
                    dataType: "number",
                    list: false
                },
                columnGap: {
                    id: "77xpto676f8gdh4q4wik2",
                    static: 0,
                    type: "number",
                    dataType: "number",
                    list: false
                },
                stackAtBreakpoint: {
                    id: "fd4awwiyukmhges8e81up",
                    type: "select",
                    dataType: "text",
                    list: false
                },
                reverseWhenStacked: {
                    id: "y0gwcjqv9jfjhh7ipmiye",
                    type: "boolean",
                    dataType: "boolean",
                    list: false
                },
                "columns/0/children": {
                    type: "slot",
                    dataType: "string",
                    list: false,
                    static: "s8bgyx2izbzssupwkcxor",
                    id: "xnhnc9wfecsvxbwthqmtg"
                },
                "columns/1/children": {
                    type: "slot",
                    dataType: "string",
                    list: false,
                    static: "shrqfg7cd0ouph34saned",
                    id: "98qrmsrkyz6c5sf01gbq1"
                }
            },
            styles: {
                boxSizing: {
                    static: "border-box"
                },
                display: {
                    static: "flex"
                },
                flexDirection: {
                    static: "row"
                },
                flexFlow: {
                    static: "wrap"
                },
                justifyContent: {
                    static: "flex-start"
                },
                alignItems: {
                    static: "stretch"
                },
                width: {
                    static: "100%"
                },
                margin: {
                    static: "0px"
                },
                padding: {
                    static: "5px"
                }
            }
        },
        s8bgyx2izbzssupwkcxor: {
            inputs: {
                children: {
                    type: "slot",
                    dataType: "string",
                    list: true,
                    static: ["du6webjdvtitqvrmwqgnz"],
                    id: "w3zzk3g1sroypomcnc69c"
                }
            },
            styles: {
                padding: {
                    static: "10px"
                }
            }
        },
        du6webjdvtitqvrmwqgnz: {
            inputs: {
                content: {
                    id: "t3usuhc187e2wrudlok2z",
                    static: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph-element","version":1,"textFormat":0,"textStyle":"","styles":[{"styleId":"paragraph1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
                    type: "richText",
                    dataType: "json",
                    list: false
                }
            }
        },
        shrqfg7cd0ouph34saned: {
            inputs: {
                children: {
                    type: "slot",
                    dataType: "string",
                    list: true,
                    static: ["hj7doflihy55frh7qats3"],
                    id: "6eafyn8e9xmw2h1emuslz"
                }
            },
            styles: {
                padding: {
                    static: "10px"
                }
            }
        },
        hj7doflihy55frh7qats3: {
            inputs: {
                content: {
                    id: "i0jvbb0o25akgy28py753",
                    static: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph-element","version":1,"textFormat":0,"textStyle":"","styles":[{"styleId":"paragraph1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
                    type: "richText",
                    dataType: "json",
                    list: false
                }
            }
        },
        a3joeguclfb0pws7iy3z6: {
            inputs: {
                content: {
                    id: "wmg98wmgpm3e4esq1hcnf",
                    static: '{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Published Page","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading-element","version":1,"tag":"h1","styles":[{"styleId":"heading1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1,"textFormat":1}}',
                    type: "richText",
                    dataType: "json",
                    list: false
                }
            },
            styles: {},
            metadata: {}
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
        use09dto6o4czn4liae6c: {
            type: "Webiny/Element",
            id: "use09dto6o4czn4liae6c",
            parent: {
                id: "root",
                slot: "children"
            },
            component: {
                name: "Webiny/Grid"
            }
        },
        s8bgyx2izbzssupwkcxor: {
            type: "Webiny/Element",
            id: "s8bgyx2izbzssupwkcxor",
            parent: {
                id: "use09dto6o4czn4liae6c",
                slot: "columns/0/children"
            },
            component: {
                name: "Webiny/GridColumn"
            }
        },
        du6webjdvtitqvrmwqgnz: {
            type: "Webiny/Element",
            id: "du6webjdvtitqvrmwqgnz",
            parent: {
                id: "s8bgyx2izbzssupwkcxor",
                slot: "children"
            },
            component: {
                name: "Webiny/RichText"
            }
        },
        shrqfg7cd0ouph34saned: {
            type: "Webiny/Element",
            id: "shrqfg7cd0ouph34saned",
            parent: {
                id: "use09dto6o4czn4liae6c",
                slot: "columns/1/children"
            },
            component: {
                name: "Webiny/GridColumn"
            }
        },
        hj7doflihy55frh7qats3: {
            type: "Webiny/Element",
            id: "hj7doflihy55frh7qats3",
            parent: {
                id: "shrqfg7cd0ouph34saned",
                slot: "children"
            },
            component: {
                name: "Webiny/RichText"
            }
        },
        a3joeguclfb0pws7iy3z6: {
            type: "Webiny/Element",
            id: "a3joeguclfb0pws7iy3z6",
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
