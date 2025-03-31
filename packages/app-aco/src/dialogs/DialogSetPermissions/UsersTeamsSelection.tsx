import React from "react";
import { List, Scrollbar, Text } from "@webiny/admin-ui";
import { ListItemGraphic } from "./UsersTeamsSelection/ListItemGraphic";
import { ListItemText } from "./UsersTeamsSelection/ListItemText";
import { ListItemMeta } from "./UsersTeamsSelection/ListItemMeta";
import { FolderLevelPermissionsTarget, FolderPermission } from "~/types";

interface UsersTeamsSelectionProps {
    targetsList: FolderLevelPermissionsTarget[];
    permissions: FolderPermission[];
    onRemoveAccess: (params: { permission: FolderPermission }) => void;
    onUpdatePermission: (params: { permission: FolderPermission }) => void;
}

type Selection = Array<{ permission: FolderPermission; target: FolderLevelPermissionsTarget }>;

export const UsersTeamsSelection = ({
    permissions = [],
    targetsList,
    onRemoveAccess,
    onUpdatePermission
}: UsersTeamsSelectionProps) => {
    const selection = permissions
        .map(permission => {
            const target = targetsList.find(u => u.target === permission.target);
            if (target) {
                return { permission, target };
            }

            return null;
        })
        .filter(Boolean) as Selection;

    return (
        <>
            <Text as={"div"} className={"wby-mb-md"}>
                People and teams with access
            </Text>
            <Scrollbar style={{ height: "300px" }}>
                <List>
                    {selection?.map(item => (
                        <List.Item
                            key={item!.permission.target}
                            title={<ListItemText {...item} />}
                            icon={<ListItemGraphic {...item} />}
                            actions={
                                <ListItemMeta
                                    {...item!}
                                    targetsList={targetsList}
                                    onRemoveAccess={onRemoveAccess}
                                    onUpdatePermission={onUpdatePermission}
                                />
                            }
                        />
                    ))}
                </List>
            </Scrollbar>
        </>
    );
};
