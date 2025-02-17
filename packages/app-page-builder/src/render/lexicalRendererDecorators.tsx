import type { DecoratorsCollection } from "@webiny/app";
import { ParagraphRenderer } from "@webiny/app-page-builder-elements/renderers/paragraph.js";
import { HeadingRenderer } from "@webiny/app-page-builder-elements/renderers/heading.js";
import { LexicalParagraphDecorator } from "~/render/plugins/elements/paragraph/LexicalParagraph.js";
import { LexicalHeadingDecorator } from "~/render/plugins/elements/heading/LexicalHeading.js";

export const lexicalRendererDecorators: DecoratorsCollection = [
    [ParagraphRenderer.Component, [LexicalParagraphDecorator]],
    [HeadingRenderer.Component, [LexicalHeadingDecorator]]
];
