import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import orderBy from "lodash/orderBy.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { Image } from "@webiny/app/components/index.js";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemMeta,
    ListActions,
    ListItemGraphic,
    DataListModalOverlayAction,
    DataListModalOverlay
} from "@webiny/ui/List/index.js";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button/index.js";
import { Avatar } from "@webiny/ui/Avatar/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Select } from "@webiny/ui/Select/index.js";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog.js";
import SearchUI from "@webiny/app-admin/components/SearchUI.js";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { ReactComponent as FilterIcon } from "@webiny/app-admin/assets/icons/filter-24px.svg";
import { DELETE_USER, LIST_USERS } from "./graphql.js";
import { deserializeSorters } from "../utils.js";
import { UserItem } from "~/UserItem.js";
import { DeleteAction } from "./components/DeleteAction.js";

const t = i18n.ns("app-identity/admin/users/data-list");

const SORTERS = [
    {
        label: t`Newest to oldest`,
        sorter: "createdOn_DESC"
    },
    {
        label: t`Oldest to newest`,
        sorter: "createdOn_ASC"
    },
    {
        label: t`Email A-Z`,
        sorter: "email_ASC"
    },
    {
        label: t`Email Z-A`,
        sorter: "email_DESC"
    }
];

interface FilterUsersCallable {
    (user: Pick<UserItem, "email" | "firstName" | "lastName">): boolean;
}

const UsersDataList = () => {
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState<string>(SORTERS[0].sorter);
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog({
        dataTestId: "default-data-list.delete-dialog"
    });

    const filterUsers = useCallback<FilterUsersCallable>(
        ({ email, firstName, lastName }) => {
            return (
                email.toLowerCase().includes(filter) ||
                firstName.toLowerCase().includes(filter) ||
                lastName.toLowerCase().includes(filter)
            );
        },
        [filter]
    );

    const sortUsers = useCallback(
        (users: UserItem[]) => {
            if (!sort) {
                return users;
            }
            const [key, sortBy] = deserializeSorters(sort);
            return orderBy(users, [key], [sortBy]);
        },
        [sort]
    );

    const { data: listUsers, loading: usersLoading } = useQuery(LIST_USERS);

    const [deleteIt, { loading: deleteLoading }] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: LIST_USERS }]
    });

    const data = usersLoading && !listUsers ? [] : listUsers.adminUsers.users.data || [];
    const filteredData = filter === "" ? data : data.filter(filterUsers);
    const userList = sortUsers(filteredData);
    const id = new URLSearchParams(location.search).get("id");

    const deleteItem = useCallback(
        (item: Pick<UserItem, "id" | "email">) => {
            showConfirmation(async () => {
                const response = await deleteIt({
                    variables: item
                });

                const error = response?.data?.adminUsers?.deleteUser?.error;
                if (error) {
                    return showSnackbar(error.message);
                }

                showSnackbar(t`User "{email}" deleted.`({ email: item.email }));

                if (id === item.id) {
                    history.push(`/admin-users`);
                }
            });
        },
        [id]
    );

    const usersDataListModalOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Cell span={12}>
                        <Select value={sort} onChange={setSort} label={t`Sort by`}>
                            {SORTERS.map(({ label, sorter }) => {
                                return (
                                    <option key={label} value={sorter}>
                                        {label}
                                    </option>
                                );
                            })}
                        </Select>
                    </Cell>
                </Grid>
            </DataListModalOverlay>
        ),
        [sort]
    );

    const loading = usersLoading || deleteLoading;

    return (
        <DataList
            title={t`Admin Users`}
            actions={
                <ButtonSecondary
                    data-testid="new-record-button"
                    onClick={() => history.push("/admin-users?new=true")}
                >
                    <ButtonIcon icon={<AddIcon />} /> {t`New User`}
                </ButtonSecondary>
            }
            data={userList}
            loading={loading}
            search={
                <SearchUI value={filter} onChange={setFilter} inputPlaceholder={t`Search users`} />
            }
            modalOverlay={usersDataListModalOverlay}
            modalOverlayAction={
                <DataListModalOverlayAction
                    icon={<FilterIcon />}
                    data-testid={"default-data-list.filter"}
                />
            }
        >
            {({ data }: { data: UserItem[] }) => (
                <ScrollList twoLine avatarList data-testid="default-data-list">
                    {data.map(item => (
                        <ListItem
                            key={item.id}
                            selected={item.id === id}
                            style={{ height: "auto" }}
                        >
                            <ListItemGraphic>
                                <Avatar
                                    renderImage={props => (
                                        <Image {...props} transform={{ width: 100 }} />
                                    )}
                                    src={item.avatar ? item.avatar.src : item.gravatar}
                                    fallbackText={item.firstName}
                                    alt={t`User's avatar.`}
                                />
                            </ListItemGraphic>
                            <ListItemText
                                onClick={() => history.push(`/admin-users?id=${item.id}`)}
                            >
                                {item.firstName} {item.lastName}
                                <ListItemTextSecondary>{item.email}</ListItemTextSecondary>
                            </ListItemText>

                            <ListItemMeta>
                                <ListActions>
                                    <DeleteAction item={item} onClick={() => deleteItem(item)} />
                                </ListActions>
                            </ListItemMeta>
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};

export default UsersDataList;
