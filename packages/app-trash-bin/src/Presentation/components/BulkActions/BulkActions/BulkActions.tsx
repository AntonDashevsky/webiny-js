import React, { useMemo } from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { Buttons } from "@webiny/app-admin";
import { IconButton } from "@webiny/ui/Button/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { useTrashBinListConfig } from "~/Presentation/configs/index.js";
import { useTrashBin } from "~/Presentation/hooks/index.js";
import { BulkActionsContainer, BulkActionsInner, ButtonsContainer } from "./BulkActions.styled.js";

export const getEntriesLabel = (count: number, isSelectedAll: boolean): string => {
    if (isSelectedAll) {
        return "all entries";
    }

    return `${count} ${count === 1 ? "item" : "items"}`;
};

export const BulkActions = () => {
    const { browser } = useTrashBinListConfig();
    const { vm, selectItems } = useTrashBin();

    const headline = useMemo((): string => {
        if (vm.isSelectedAll) {
            return "All entries selected:";
        }

        return getEntriesLabel(vm.selectedItems.length, vm.isSelectedAll) + ` selected:`;
    }, [vm.selectedItems, vm.isSelectedAll]);

    if (!vm.selectedItems.length) {
        return null;
    }

    return (
        <BulkActionsContainer>
            <BulkActionsInner>
                <ButtonsContainer>
                    <Typography use={"headline6"}>{headline}</Typography>
                    <Buttons actions={browser.bulkActions} />
                </ButtonsContainer>
                <IconButton icon={<Close />} onClick={() => selectItems([])} />
            </BulkActionsInner>
        </BulkActionsContainer>
    );
};
