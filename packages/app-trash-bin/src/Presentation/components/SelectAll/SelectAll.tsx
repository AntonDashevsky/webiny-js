import React from "react";
import { useTrashBin } from "~/Presentation/hooks/index.js";
import { ClearSelectionMessage, SelectAllMessage } from "./Messages.js";
import { SelectAllContainer } from "./SelectAll.styled.js";

export const getEntriesLabel = (count = 0): string => {
    return `${count} ${count === 1 ? "item" : "items"}`;
};

export const SelectAll = () => {
    const { vm, selectAllItems, unselectAllItems } = useTrashBin();

    if (!vm.allowSelectAll) {
        return null;
    }

    return (
        <SelectAllContainer data-testid={"select-all-container"}>
            {vm.isSelectedAll ? (
                <ClearSelectionMessage
                    onClick={unselectAllItems}
                    selected={vm.selectedItems.length}
                />
            ) : (
                <SelectAllMessage onClick={selectAllItems} selected={vm.selectedItems.length} />
            )}
        </SelectAllContainer>
    );
};
