import React, { useCallback, useMemo, useState } from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import { useRouter } from "@webiny/react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LIST_BLOCK_CATEGORIES, DELETE_BLOCK_CATEGORY } from "./graphql.js";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog.js";
import orderBy from "lodash/orderBy.js";

import {
    DataList,
    DataListModalOverlay,
    DataListModalOverlayAction,
    ScrollList,
    ListItem,
    ListItemGraphic,
    ListItemText,
    ListItemMeta,
    ListActions,
    ListItemTextSecondary
} from "@webiny/ui/List/index.js";

import { DeleteIcon } from "@webiny/ui/List/DataList/icons/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Select } from "@webiny/ui/Select/index.js";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button/index.js";
import SearchUI from "@webiny/app-admin/components/SearchUI.js";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { ReactComponent as FilterIcon } from "@webiny/app-admin/assets/icons/filter-24px.svg";
import { PbBlockCategory } from "~/types.js";
import { Icon } from "~/admin/utils/createBlockCategoryPlugin.js";
import { useBlockCategoriesPermissions } from "~/hooks/permissions/index.js";

const t = i18n.ns("app-page-builder/admin/block-categories/data-list");

interface Sorter {
    label: string;
    sort: string;
}

const SORTERS: Sorter[] = [
    {
        label: t`Newest to oldest`,
        sort: "createdOn_DESC"
    },
    {
        label: t`Oldest to newest`,
        sort: "createdOn_ASC"
    },
    {
        label: t`Name A-Z`,
        sort: "name_ASC"
    },
    {
        label: t`Name Z-A`,
        sort: "name_DESC"
    }
];

type PageBuilderBlockCategoriesDataListProps = {
    canCreate: boolean;
};
const PageBuilderBlockCategoriesDataList = ({
    canCreate
}: PageBuilderBlockCategoriesDataListProps) => {
    const [filter, setFilter] = useState<string>("");
    const [sort, setSort] = useState<string>(SORTERS[2].sort);
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const listQuery = useQuery(LIST_BLOCK_CATEGORIES);
    const [deleteIt, deleteMutation] = useMutation(DELETE_BLOCK_CATEGORY, {
        refetchQueries: [{ query: LIST_BLOCK_CATEGORIES }]
    });

    const filterData = useCallback(
        ({ slug, name }: PbBlockCategory) => {
            return slug.toLowerCase().includes(filter) || name.toLowerCase().includes(filter);
        },
        [filter]
    );

    const sortData = useCallback(
        (categories: PbBlockCategory[]) => {
            if (!sort) {
                return categories;
            }
            const [field, order] = sort.split("_");
            return orderBy(categories, field, order.toLowerCase() as "asc" | "desc");
        },
        [sort]
    );

    const { showConfirmation } = useConfirmationDialog();

    const data: PbBlockCategory[] = listQuery?.data?.pageBuilder?.listBlockCategories?.data || [];
    const slug = new URLSearchParams(location.search).get("slug");

    const deleteItem = useCallback(
        (item: PbBlockCategory) => {
            showConfirmation(async () => {
                const response = await deleteIt({
                    variables: item
                });

                const error = response?.data?.pageBuilder?.deleteBlockCategory?.error;
                if (error) {
                    return showSnackbar(error.message);
                }

                showSnackbar(t`Block Category "{slug}" deleted.`({ slug: item.slug }));

                if (slug === item.slug) {
                    history.push(`/page-builder/block-categories`);
                }
            });
        },
        [slug]
    );

    const { canDelete } = useBlockCategoriesPermissions();

    const loading = [listQuery, deleteMutation].find(item => item.loading);

    const blockCategoriesDataListModalOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Cell span={12}>
                        <Select
                            value={sort}
                            onChange={setSort}
                            label={t`Sort by`}
                            description={"Sort block categories by"}
                        >
                            {SORTERS.map(({ label, sort: value }) => {
                                return (
                                    <option key={label} value={value}>
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

    const filteredData: PbBlockCategory[] = filter === "" ? data : data.filter(filterData);
    const categoryList: PbBlockCategory[] = sortData(filteredData);

    return (
        <DataList
            title={t`Block Categories`}
            loading={Boolean(loading)}
            data={categoryList}
            actions={
                canCreate ? (
                    <ButtonSecondary
                        data-testid="data-list-new-record-button"
                        onClick={() => history.push("/page-builder/block-categories?new=true")}
                    >
                        <ButtonIcon icon={<AddIcon />} /> {t`New Block Category`}
                    </ButtonSecondary>
                ) : null
            }
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={t`Search block categories`}
                />
            }
            modalOverlay={blockCategoriesDataListModalOverlay}
            modalOverlayAction={
                <DataListModalOverlayAction
                    icon={<FilterIcon />}
                    data-testid={"default-data-list.filter"}
                />
            }
        >
            {({ data }: { data: PbBlockCategory[] }) => (
                <ScrollList data-testid="default-data-list">
                    {data.map(item => (
                        <ListItem
                            key={item.slug}
                            selected={item.slug === slug}
                            onClick={() =>
                                history.push(`/page-builder/block-categories?slug=${item.slug}`)
                            }
                        >
                            <ListItemGraphic>
                                <Icon category={item} />
                            </ListItemGraphic>
                            <ListItemText>
                                {item.name}
                                <ListItemTextSecondary>
                                    {item.description || t`No description provided.`}
                                </ListItemTextSecondary>
                            </ListItemText>

                            {canDelete(item?.createdBy?.id) && (
                                <ListItemMeta>
                                    <ListActions>
                                        <DeleteIcon
                                            onClick={() => deleteItem(item)}
                                            data-testid={
                                                "pb-block-categories-list-delete-block-category-btn"
                                            }
                                        />
                                    </ListActions>
                                </ListItemMeta>
                            )}
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};

export default PageBuilderBlockCategoriesDataList;
