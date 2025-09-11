import React from "react";
import type { FiltersOnSubmit } from "@webiny/app-admin";
import { Filters as BaseFilters } from "@webiny/app-admin";
import { useFileManagerView, useFileManagerViewConfig } from "~/index";

export const Filters = () => {
    const { showingFilters, setFilters } = useFileManagerView();
    const { browser } = useFileManagerViewConfig();

    const applyFilters: FiltersOnSubmit = data => {
        if (!Object.keys(data).length) {
            return;
        }

        const convertedFilters = browser.filtersToWhere.reduce(
            (data, converter) => converter(data),
            data
        );
        setFilters(convertedFilters);
    };

    return <BaseFilters filters={browser.filters} show={showingFilters} onChange={applyFilters} />;
};
