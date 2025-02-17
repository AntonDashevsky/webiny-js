import React from "react";

import { ReactComponent as SavedSearchIcon } from "@material-design-icons/svg/outlined/saved_search.svg";
import { ReactComponent as MoreIcon } from "@material-design-icons/svg/outlined/more_vert.svg";

import { IconButton } from "@webiny/ui/Button/index.js";
import { List, ListItem, ListItemMeta, ListItemText, ListItemTextPrimary } from "@webiny/ui/List/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { Menu, MenuItem } from "@webiny/ui/Menu/index.js";

import { ListActions } from "../QueryManagerDialog.styled.js";
import { QueryManagerFilter } from "../QueryManagerDialog.js";
import { Description } from "~/components/AdvancedSearch/QueryManagerDialog/components/Description.js";

type filterCallback = (filterId: string) => void;

interface FilterListProps {
    onEdit: filterCallback;
    onRename: filterCallback;
    onDelete: filterCallback;
    onSelect: filterCallback;
    onClone: filterCallback;
    filters: QueryManagerFilter[];
}

export const FilterList = (props: FilterListProps) => {
    return (
        <List twoLine nonInteractive>
            {props.filters.map(filter => (
                <ListItem key={filter.id}>
                    <ListItemText>
                        <ListItemTextPrimary>{filter.name}</ListItemTextPrimary>
                        <Description createdOn={filter.createdOn}>{filter.description}</Description>
                    </ListItemText>
                    <ListItemMeta>
                        <ListActions>
                            <Tooltip content={"Apply filter"} placement={"left"}>
                                <IconButton
                                    icon={<SavedSearchIcon />}
                                    label={"Apply filter"}
                                    onClick={() => props.onSelect(filter.id)}
                                />
                            </Tooltip>
                            <Menu handle={<IconButton icon={<MoreIcon />} label={"Open menu"} />}>
                                <MenuItem onClick={() => props.onEdit(filter.id)}>Edit</MenuItem>
                                <MenuItem onClick={() => props.onRename(filter.id)}>
                                    Rename
                                </MenuItem>
                                <MenuItem onClick={() => props.onClone(filter.id)}>Clone</MenuItem>
                                <MenuItem onClick={() => props.onDelete(filter.id)}>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </ListActions>
                    </ListItemMeta>
                </ListItem>
            ))}
        </List>
    );
};
