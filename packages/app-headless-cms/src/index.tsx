import React from "react";
import { ContentEntryListConfig } from "./ContentEntryListConfig.js";
export * from "./HeadlessCMS.js";
export * from "./admin/hooks/index.js";
export { LexicalEditorConfig } from "~/admin/lexicalConfig/LexicalEditorConfig.js";
export * from "~/admin/components/ContentEntryForm/FieldElement.js";
export { ModelProvider } from "~/admin/components/ModelProvider/index.js";

export { ContentEntryListConfig };

interface LegacyContentEntriesViewConfigProps {
    children: React.ReactNode;
}

/**
 * DANGER!
 * The following components are created to support the old experimental API:
 * - `Filter` has been mapped to the new `ContentEntryListConfig.Browser`namespace;
 * - `Sorter` has been deprecated.
 *
 * Check out 5.37.0 changelog and discover the new `ContentEntryListConfig` API.
 */
const LegacyContentEntriesViewConfig = ({ children }: LegacyContentEntriesViewConfigProps) => {
    return <ContentEntryListConfig>{children}</ContentEntryListConfig>;
};

// eslint-disable-next-line
const LegacySorter = (props: any) => null;

/**
 * @deprecated Use ContentEntryListConfig instead.
 */
export const ContentEntriesViewConfig = Object.assign(LegacyContentEntriesViewConfig, {
    Filter: ContentEntryListConfig.Browser.Filter,
    Sorter: LegacySorter
});

export { ContentEntryEditorConfig } from "./ContentEntryEditorConfig.js";

export * from "./plugins/index.js";
