import React from "react";
import { AddTranslatableItemsContext } from "./AddTranslatableItemsContext.js";
import { SaveTranslatableValues } from "~/translations/ExtractTranslatableValues/SaveTranslatableValues.js";
import { PageEditorConfig } from "~/pageEditor/index.js";
import {
    createElementRendererInputsDecorator,
    type CreateTranslatableItems,
    type NewTranslatableItem
} from "~/translations/ExtractTranslatableValues/CollectElementValues.js";

export interface ExtractTranslatableValuesProps {
    createTranslatableItems: CreateTranslatableItems;
}

export type { NewTranslatableItem, CreateTranslatableItems };

export const ExtractTranslatableValues = ({
    createTranslatableItems
}: ExtractTranslatableValuesProps) => {
    const CollectElementValues = createElementRendererInputsDecorator(createTranslatableItems);

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
