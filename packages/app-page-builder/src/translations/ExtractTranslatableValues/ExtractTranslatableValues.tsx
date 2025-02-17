import React from "react";
import { AddTranslatableItemsContext } from "./AddTranslatableItemsContext.js";
import { SaveTranslatableValues } from "~/translations/ExtractTranslatableValues/SaveTranslatableValues.js";
import { PageEditorConfig } from "~/pageEditor/index.js";
import {
    createElementRendererInputsDecorator,
    CreateTranslatableItem
} from "~/translations/ExtractTranslatableValues/CollectElementValues.js";

interface ExtractTranslatableValuesProps {
    createTranslatableItem: CreateTranslatableItem;
}

export const ExtractTranslatableValues = ({
    createTranslatableItem
}: ExtractTranslatableValuesProps) => {
    const CollectElementValues = createElementRendererInputsDecorator(createTranslatableItem);

    return (
        <>
            <AddTranslatableItemsContext />
            <PageEditorConfig>
                <CollectElementValues />
                <SaveTranslatableValues />
            </PageEditorConfig>
        </>
    );
};
