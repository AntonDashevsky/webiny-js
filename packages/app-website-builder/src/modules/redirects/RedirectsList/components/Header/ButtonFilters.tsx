import React from "react";
import { FiltersToggle } from "@webiny/app-admin";
import { useDocumentList } from "~/modules/redirects/RedirectsList/useDocumentList.js";

export const ButtonFilters = () => {
    const { vm, showFilters } = useDocumentList();

    return (
        <FiltersToggle
            onFiltersToggle={() => showFilters(!vm.isFilterVisible)}
            showingFilters={vm.isFilterVisible}
        />
    );
};
