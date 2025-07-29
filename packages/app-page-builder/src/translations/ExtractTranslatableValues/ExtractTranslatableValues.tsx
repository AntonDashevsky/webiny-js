import React from "react";
import { AddTranslatableItemsContext } from "./AddTranslatableItemsContext";
import { SaveTranslatableValues } from "~/translations/ExtractTranslatableValues/SaveTranslatableValues";
import { PageEditorConfig } from "~/pageEditor";
import type {
    CreateTranslatableItems,
    NewTranslatableItem
} from "~/translations/ExtractTranslatableValues/CollectElementValues";
import { createElementRendererInputsDecorator } from "~/translations/ExtractTranslatableValues/CollectElementValues";

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
