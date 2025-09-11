import React from "react";
import type { FiltersOnSubmit } from "@webiny/app-admin";
import { Filters as BaseFilters } from "@webiny/app-admin";
import { useDocumentList } from "~/modules/redirects/RedirectsList/useDocumentList.js";
import { useNavigateFolder } from "@webiny/app-aco";
import { useRedirectListConfig } from "~/modules/redirects/configs/index.js";
import { useFilterRedirects } from "~/features/redirects/index.js";

export const Filters = () => {
    const { browser } = useRedirectListConfig();
    const { vm } = useDocumentList();
    const { filterRedirects } = useFilterRedirects();
    const { currentFolderId } = useNavigateFolder();

    const applyFilters: FiltersOnSubmit = data => {
        if (!Object.keys(data).length) {
            return;
        }

        const convertedFilters = browser.filtersToWhere.reduce(
            (data, converter) => converter(data),
            data
        );

        filterRedirects(convertedFilters, currentFolderId);
    };

    return (
        <BaseFilters filters={browser.filters} show={vm.isFilterVisible} onChange={applyFilters} />
    );
};
