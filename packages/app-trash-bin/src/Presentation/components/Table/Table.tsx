import React from "react";
import { Table as AcoTable } from "@webiny/app-aco";
import { useTrashBin } from "~/Presentation/hooks/index.js";
import { TrashBinItemDTO } from "~/Domain/index.js";
import { LoadingActions } from "~/types.js";

export const Table = () => {
    const { vm, selectItems, sortItems } = useTrashBin();

    return (
        <AcoTable<TrashBinItemDTO>
            data={vm.items}
            loading={vm.loading[LoadingActions.list]}
            onSelectRow={entries => selectItems(entries)}
            sorting={vm.sorting}
            onSortingChange={sort => sortItems(sort)}
            selected={vm.selectedItems}
            nameColumnId={vm.nameColumnId}
            namespace={"trash-bin"}
        />
    );
};
