import { generateInitialLexicalValue } from "~/utils/generateInitialLexicalValue";
import { LexicalValue } from "~/types";

const nodeTypeMap: Record<string, string> = {
    "webiny-list": "list",
    "webiny-listitem": "list-item",
    "font-color-node": "font-color",
    "heading-element": "heading",
    "paragraph-element": "paragraph",
    "webiny-quote": "quote"
};

// Migrate old node types
function deepReplaceType(node: any): void {
    if (nodeTypeMap.hasOwnProperty(node.type)) {
        node.type = nodeTypeMap[node.type];
    }

    if (node.children) {
        node.children.forEach(deepReplaceType);
    }
}

export const prepareLexicalState = (value: LexicalValue | null) => {
    if (!value) {
        return generateInitialLexicalValue();
    }

    try {
        const data = JSON.parse(value);
        deepReplaceType(data.root);
        return JSON.stringify(data);
    } catch {
        return generateInitialLexicalValue();
    }
};
