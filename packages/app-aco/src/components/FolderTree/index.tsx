import React, { useMemo } from "react";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { useGetFolderLevelPermission, useListFolders } from "~/features/index.js";
import { CreateButton } from "./ButtonCreate/index.js";
import { Empty } from "./Empty/index.js";
import { Loader } from "./Loader/index.js";
import { List } from "./List/index.js";
import { Container } from "./styled.js";
import { FolderItem } from "~/types.js";
import { ROOT_FOLDER } from "~/constants.js";
import { AcoWithConfig } from "~/config/index.js";

export { Loader };

export interface FolderTreeProps {
    onFolderClick: (data: FolderItem) => void;
    enableCreate?: boolean;
    rootFolderLabel?: string;
    enableActions?: boolean;
    focusedFolderId?: string;
    hiddenFolderIds?: string[];
}

export const FolderTree = ({
    focusedFolderId,
    hiddenFolderIds,
    enableActions,
    enableCreate,
    onFolderClick,
    rootFolderLabel
}: FolderTreeProps) => {
    const { loading, folders } = useListFolders();
    const { getFolderLevelPermission: canManageStructure } =
        useGetFolderLevelPermission("canManageStructure");

    const localFolders = useMemo(() => {
        if (!folders) {
            return [];
        }

        return folders.reduce<FolderItem[]>((acc, item) => {
            if (item.id === ROOT_FOLDER && rootFolderLabel) {
                return [...acc, { ...item, title: rootFolderLabel }];
            }
            return [...acc, item];
        }, []);
    }, [folders]);

    const renderList = () => {
        if (loading.INIT || loading.LIST) {
            return <Loader />;
        }

        let createButton = null;
        if (enableCreate) {
            const canCreate = canManageStructure(focusedFolderId!);

            createButton = <CreateButton disabled={!canCreate} />;

            if (!canCreate) {
                createButton = (
                    <Tooltip content={`Cannot create folder because you're not an owner.`}>
                        {createButton}
                    </Tooltip>
                );
            }
        }

        if (localFolders.length > 0) {
            return (
                <AcoWithConfig>
                    <List
                        folders={localFolders}
                        onFolderClick={onFolderClick}
                        focusedFolderId={focusedFolderId}
                        hiddenFolderIds={hiddenFolderIds}
                        enableActions={enableActions}
                    />
                    {enableCreate && createButton}
                </AcoWithConfig>
            );
        }

        return (
            <>
                <Empty />
                {createButton}
            </>
        );
    };
    return <Container>{renderList()}</Container>;
};
