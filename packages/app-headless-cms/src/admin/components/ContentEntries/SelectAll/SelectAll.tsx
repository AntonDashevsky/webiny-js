import React from "react";
import { useContentEntriesList } from "~/admin/views/contentEntries/hooks/index.js";
import { SelectAllContainer } from "./SelectAll.styled.js";
import { ClearSelectionMessage, SelectAllMessage } from "./Messages.js";

export const getEntriesLabel = (count = 0): string => {
    return `${count} ${count === 1 ? "entry" : "entries"}`;
};

export const SelectAll = () => {
    const list = useContentEntriesList();

    if (!list.showingSelectAll) {
        return null;
    }

    return (
        <SelectAllContainer data-testid={"select-all-container"}>
            {list.isSelectedAll ? (
                <ClearSelectionMessage onClick={list.unselectAll} selected={list.selected.length} />
            ) : (
                <SelectAllMessage onClick={list.selectAll} selected={list.selected.length} />
            )}
        </SelectAllContainer>
    );
};
