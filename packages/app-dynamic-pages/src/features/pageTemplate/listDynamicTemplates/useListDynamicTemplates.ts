import { useListPageTemplates } from "@webiny/app-page-builder/features/index.js";
import { hasMainDataSource } from "~/features/index.js";

export const useListDynamicTemplates = () => {
    const { pageTemplates } = useListPageTemplates();

    const dynamicTemplates = pageTemplates.filter(template =>
        hasMainDataSource(template.dataSources)
    );

    return { dynamicTemplates };
};
