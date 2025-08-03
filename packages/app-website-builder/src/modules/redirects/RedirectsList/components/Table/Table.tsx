import React from "react";
import { Table as AcoTable } from "@webiny/app-aco";
import type { DocumentDto } from "~/modules/redirects/RedirectsList/presenters/index.js";
import { useDocumentList } from "~/modules/redirects/RedirectsList/useDocumentList.js";
import { useSortRedirects } from "~/features/redirects/index.js";
import { useSelectRedirects } from "~/features/redirects/selectRedirects/useSelectRedirects";

export const Table = () => {
    const { vm } = useDocumentList();
    const { sortRedirects } = useSortRedirects();
    const { selectRedirects } = useSelectRedirects();

    return (
        <AcoTable<DocumentDto>
            data={vm.data}
            loading={vm.isLoading}
            sorting={vm.sorting}
            onSortingChange={sort => sortRedirects(sort)}
            onSelectRow={documents => selectRedirects(documents)}
            selected={vm.selected}
            nameColumnId={"redirectFrom"}
            namespace={"wbRedirect"}
        />
    );
};
