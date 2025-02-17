import React, { useMemo } from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { i18n } from "@webiny/app/i18n/index.js";
import { Buttons } from "@webiny/app-admin";
import { IconButton } from "@webiny/ui/Button/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";

import { useFileManagerViewConfig } from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig.js";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider/index.js";

import { BulkActionsContainer, BulkActionsInner, ButtonsContainer } from "./BulkActions.styled.js";

const t = i18n.ns("app-file-manager/components/bulk-actions");

export const getFilesLabel = (count = 0): string => {
    return `${count} ${count === 1 ? "file" : "files"}`;
};

export const BulkActions = () => {
    const { browser } = useFileManagerViewConfig();
    const view = useFileManagerView();

    const headline = useMemo((): string => {
        return t`{label} selected:`({
            label: getFilesLabel(view.selected.length)
        });
    }, [view.selected]);

    if (view.hasOnSelectCallback || !view.selected.length) {
        return null;
    }

    return (
        <BulkActionsContainer>
            <BulkActionsInner>
                <ButtonsContainer>
                    <Typography use={"headline6"}>{headline}</Typography>
                    <Buttons actions={browser.bulkActions} />
                </ButtonsContainer>
                <IconButton icon={<Close />} onClick={() => view.setSelected([])} />
            </BulkActionsInner>
        </BulkActionsContainer>
    );
};
