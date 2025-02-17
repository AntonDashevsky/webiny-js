import {
    DynamicZoneContainer,
    MultiValueContainer,
    MultiValueItemContainer,
    MultiValueItem,
    TemplateGallery,
    useTemplate
} from "~/admin/plugins/fieldRenderers/dynamicZone/index.js";
import { ContentEntryForm as BaseContentEntryForm } from "./admin/components/ContentEntryForm/ContentEntryForm.js";
import { Header as ContentEntryFormHeader } from "./admin/components/ContentEntryForm/Header/index.js";
import { ContentEntryFormPreview } from "./admin/components/ContentEntryForm/ContentEntryFormPreview.js";
import { useContentEntryForm } from "./admin/components/ContentEntryForm/useContentEntryForm.js";
import { DefaultLayout } from "~/admin/components/ContentEntryForm/DefaultLayout.js";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/index.js";
import { ContentEntry } from "~/admin/views/contentEntries/ContentEntry.js";
import { ContentEntryEditorConfig as BaseContentEntryEditorConfig } from "./admin/config/contentEntries/index.js";
import { SingletonContentEntry } from "~/admin/views/contentEntries/ContentEntry/SingletonContentEntry.js";
import { useSingletonContentEntry } from "~/admin/views/contentEntries/hooks/useSingletonContentEntry.js";

export const ContentEntryEditorConfig = Object.assign(BaseContentEntryEditorConfig, {
    ContentEntry: Object.assign(ContentEntry, {
        useContentEntry,
        DefaultLayout,
        ContentEntryForm: Object.assign(BaseContentEntryForm, {
            useContentEntryForm,
            Header: ContentEntryFormHeader
        }),
        ContentEntryFormPreview
    }),
    SingletonContentEntry: Object.assign(SingletonContentEntry, {
        useSingletonContentEntry
    }),
    FieldRenderers: {
        DynamicZone: {
            Template: {
                useTemplate
            },
            Container: DynamicZoneContainer,
            // SingleValue: {
            //     Container: null,
            //     ItemContainer: null,
            //     Item: null
            // },
            MultiValue: {
                Container: MultiValueContainer,
                ItemContainer: MultiValueItemContainer,
                Item: MultiValueItem
            },
            TemplateGallery
        }
    }
});
