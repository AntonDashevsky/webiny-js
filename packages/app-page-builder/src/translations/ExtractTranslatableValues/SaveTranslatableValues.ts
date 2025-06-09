import { useEffect } from "react";
import debounce from "lodash/debounce.js";
import { type PbEditorElementTree } from "~/types.js";
import { useEventActionHandler } from "~/editor/index.js";
import { type PageEditorEventActionCallableState } from "~/pageEditor/types.js";
import { useSaveTranslatableCollection } from "~/translations/index.js";
import { ToggleSaveRevisionStateActionEvent } from "~/pageEditor/config/eventActions/saveRevision/index.js";
import {
    type TranslatableItem,
    useTranslations
} from "~/translations/ExtractTranslatableValues/TranslationContext.js";

const extractElementIds = (elements: PbEditorElementTree[]): string[] => {
    return [
        ...elements.map(element => [element.id, ...extractElementIds(element.elements)]).flat()
    ];
};

export const SaveTranslatableValues = () => {
    const eventActionHandler = useEventActionHandler<PageEditorEventActionCallableState>();
    const translations = useTranslations();
    const { saveTranslatableCollection } = useSaveTranslatableCollection();

    const saveTranslations = debounce(async (orderedElementIds: string[]) => {
        if (!translations) {
            return;
        }

        const items = translations.getTranslationItems();
        if (!items.length) {
            return;
        }

        const filteredAndSortedItems: TranslatableItem[] = [];
        orderedElementIds.forEach(elementId => {
            items
                .filter(item => item.itemId.startsWith(`element:${elementId}.`))
                .forEach(item => filteredAndSortedItems.push(item));
        });

        const collection = {
            collectionId: items[0].collectionId,
            items: filteredAndSortedItems.map(item => ({
                itemId: item.itemId,
                value: item.value,
                context: item.context
            }))
        };

        await saveTranslatableCollection(collection);
    }, 1000);

    useEffect(() => {
        if (!translations) {
            return;
        }

        const offSaveRevisionAction = eventActionHandler.on(
            ToggleSaveRevisionStateActionEvent,
            async (_, context, meta) => {
                const tree = await context.eventActionHandler.getRawElementTree();
                const orderedElementIds = extractElementIds([tree]);

                if (meta.saving) {
                    saveTranslations(orderedElementIds);
                }

                return {
                    actions: []
                };
            }
        );

        return () => {
            offSaveRevisionAction();
        };
    }, []);

    return null;
};
