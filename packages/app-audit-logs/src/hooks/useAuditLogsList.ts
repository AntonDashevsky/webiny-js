import { useCallback, useEffect, useState, useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import debounce from "lodash/debounce.js";

import { useRouter } from "@webiny/react-router";
import { type OnSortingChange, type Sorting } from "@webiny/ui/DataTable/index.js";
import { useAcoList, createSort } from "@webiny/app-aco";
import { type ListMeta, type SearchRecordItem } from "@webiny/app-aco/types.js";

import {
    type Entry,
    transformCmsContentEntriesToRecordEntries
} from "~/utils/transformCmsContentEntriesToRecordEntries.js";
import { LIST_USERS } from "~/graphql.js";
import { type AuditLog, type User } from "~/types.js";

interface UpdateSearchCallableParams {
    search: string;
    query: URLSearchParams;
}
interface UpdateSearchCallable {
    (params: UpdateSearchCallableParams): void;
}

export interface UseAuditLogs {
    hideFilters: () => void;
    isListLoading: boolean;
    isListLoadingMore: boolean;
    isSearch: boolean;
    listMoreRecords: () => void;
    listTitle?: string;
    meta: ListMeta;
    records: Entry[];
    search: string;
    setSearch: (value: string) => void;
    setSorting: OnSortingChange;
    showFilters: () => void;
    showingFilters: boolean;
    sorting: Sorting;
    setFilters: (data: Record<string, any>) => void;
}

export const useAuditLogsList = (hasAccessToUsers: boolean): UseAuditLogs => {
    const { history } = useRouter();

    const {
        isListLoading,
        isListLoadingMore,
        isSearch,
        listMoreRecords,
        listTitle,
        meta,
        records: initialRecords,
        setSearchQuery,
        setListSort,
        setFilters,
        showFilters,
        hideFilters,
        showingFilters
    } = useAcoList<SearchRecordItem<AuditLog>>();

    const [sorting, setSorting] = useState<Sorting>([]);
    const [search, setSearch] = useState<string>("");
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("search") || "";

    const { data: listUsers, loading: usersLoading } = useQuery(LIST_USERS, {
        skip: !hasAccessToUsers
    });

    // Search-related logics: update `searchQuery` state and querystring
    const updateSearch = useCallback(
        debounce<UpdateSearchCallable>(({ search, query }) => {
            const searchQuery = query.get("search");

            if (typeof searchQuery !== "string" && !search) {
                return;
            }

            setSearchQuery(search);

            if (searchQuery !== search) {
                if (!search) {
                    // In case of empty `search` - remove it from `querystring`
                    query.delete("search");
                } else {
                    // Otherwise, add it to `querystring`
                    query.set("search", search);
                }
                history.push(`/audit-logs?${query.toString()}`);
            }
        }, 500),
        []
    );

    // Set "search" from search "query" on page load.
    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    // When "search" changes, trigger search-related logics
    useEffect(() => {
        updateSearch({ search, query });
    }, [search]);

    const records = useMemo(() => {
        const users: User[] = listUsers?.adminUsers?.users?.data || [];

        return transformCmsContentEntriesToRecordEntries(initialRecords, users);
    }, [initialRecords, listUsers]);

    useEffect(() => {
        if (!sorting?.length) {
            return;
        }
        const sort = createSort(sorting);
        if (!sort) {
            return;
        }
        setListSort(sort);
    }, [sorting]);

    return {
        isListLoading: isListLoading || usersLoading,
        isListLoadingMore,
        isSearch,
        listTitle,
        listMoreRecords,
        meta,
        records,
        search,
        setSearch,
        sorting,
        setSorting,
        showingFilters,
        showFilters,
        hideFilters,
        setFilters
    };
};
