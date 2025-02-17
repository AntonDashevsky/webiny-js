import type { Klass, LexicalNode } from "lexical";
import { ParagraphNode as BaseParagraphNode } from "lexical";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { MarkNode } from "@lexical/mark";
import { HeadingNode as BaseHeadingNode, QuoteNode as BaseQuoteNode } from "@lexical/rich-text";
import { OverflowNode } from "@lexical/overflow";

import { AutoLinkNode, LinkNode } from "./LinkNode.js";
import { FontColorNode } from "./FontColorNode.js";
import { TypographyNode } from "./TypographyNode.js";
import { ListNode } from "./ListNode.js";
import { ListItemNode } from "./ListItemNode.js";
import { HeadingNode } from "./HeadingNode.js";
import { ParagraphNode } from "./ParagraphNode.js";
import { QuoteNode } from "./QuoteNode.js";
import { ImageNode } from "./ImageNode.js";

export * from "./FontColorNode.js";
export * from "./TypographyNode.js";
export * from "./ListNode.js";
export * from "./ListItemNode.js";
export * from "./HeadingNode.js";
export * from "./ParagraphNode.js";
export * from "./QuoteNode.js";
export * from "./ImageNode.js";
export * from "./LinkNode.js";

export * from "./utils/formatList.js";
export * from "./utils/listNode.js";
export * from "./utils/formatToQuote.js";
export * from "./utils/formatToHeading.js";
export * from "./utils/formatToParagraph.js";
export * from "./utils/clearNodeFormating.js";
export * from "./utils/toggleLink.js";

// This is a list of all the nodes that our Lexical implementation supports OOTB.
export const allNodes: ReadonlyArray<
    | Klass<LexicalNode>
    | {
          replace: Klass<LexicalNode>;
          with: <T extends { new (...args: any): any }>(node: InstanceType<T>) => LexicalNode;
      }
> = [
    // These nodes are copy-pasted from Lexical and modified to fit our needs.
    // https://github.com/facebook/lexical/tree/main/packages/lexical-playground/src/nodes
    // https://github.com/facebook/lexical/tree/main/packages
    ImageNode,
    ListNode,
    ListItemNode,

    // These nodes are directly imported from Lexical.
    CodeNode,
    HashtagNode,
    CodeHighlightNode,
    AutoLinkNode,
    OverflowNode,
    MarkNode,

    // Our custom nodes.
    FontColorNode,
    TypographyNode,

    // The following code replaces the built-in Lexical nodes with our custom ones.
    // https://lexical.dev/docs/concepts/node-replacement
    ParagraphNode,
    {
        replace: BaseParagraphNode,
        with: () => {
            return new ParagraphNode();
        }
    },
    HeadingNode,
    {
        replace: BaseHeadingNode,
        with: (node: BaseHeadingNode) => {
            return new HeadingNode(node.getTag());
        }
    },
    QuoteNode,
    {
        replace: BaseQuoteNode,
        with: () => {
            return new QuoteNode();
        }
    },
    LinkNode
];
