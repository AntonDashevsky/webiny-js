import React from "react";
import { AddButtonClickHandlers } from "~/elementDecorators/AddButtonClickHandlers.js";
import { AddButtonLinkComponent } from "~/elementDecorators/AddButtonLinkComponent.js";
import { InjectElementVariables } from "~/render/variables/InjectElementVariables.js";
import { LexicalParagraphRenderer } from "~/render/plugins/elements/paragraph/LexicalParagraph.js";
import { LexicalHeadingRenderer } from "~/render/plugins/elements/heading/LexicalHeading.js";
import { ConvertIconSettings } from "~/render/plugins/elementSettings/icon/index.js";
import { AddImageLinkComponent } from "~/elementDecorators/AddImageLinkComponent.js";

export const PageBuilder = React.memo(() => {
    return (
        <>
            <AddButtonLinkComponent />
            <AddImageLinkComponent />
            <AddButtonClickHandlers />
            <InjectElementVariables />
            <LexicalParagraphRenderer />
            <LexicalHeadingRenderer />
            <ConvertIconSettings />
        </>
    );
});

PageBuilder.displayName = "PageBuilder";
