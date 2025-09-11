import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce.js";
import { useRouter } from "@webiny/react-router";
import { makeDecoratable } from "@webiny/react-composition";
import { useContentEntries } from "./useContentEntries.js";
import type { CmsContentEntry, TableItem } from "~/types.js";
import type { OnSortingChange, Sorting } from "@webiny/ui/DataTable/index.js";
import { createSort, useAcoList, useNavigateFolder } from "@webiny/app-aco";
import { CMS_ENTRY_LIST_LINK, ROOT_FOLDER } from "~/admin/constants.js";
import type { ListMeta } from "@webiny/app-aco";
import type { FolderItem } from "@webiny/app-aco/types.js";

interface UpdateSearchCallableParams {
    search: string;
    query: URLSearchParams;
}
interface UpdateSearchCallable {
    (params: UpdateSearchCallableParams): void;
}

export interface ContentEntriesListProviderContext {
    modelId: string;
    folderId: string;
    navigateTo: (folderId?: string) => void;
    folders: FolderItem[];
    getEntryEditUrl: (item: CmsContentEntry) => string;
    hideFilters: () => void;
    isListLoading: boolean;
    isListLoadingMore: boolean;
    isSearch: boolean;
    listMoreRecords: () => void;
    listTitle?: string;
    meta: ListMeta;
    onSelectRow: (rows: TableItem[] | []) => void;
    records: CmsContentEntry[];
    search: string;
    selected: CmsContentEntry[];
    setSearch: (value: string) => void;
    setSelected: (data: CmsContentEntry[]) => void;
    setSorting: OnSortingChange;
    showFilters: () => void;
    showingFilters: boolean;
    showingSelectAll: boolean;
    sorting: Sorting;
    setFilters: (data: Record<string, any>) => void;
    selectAll: () => void;
    unselectAll: () => void;
    isSelectedAll: boolean;
    getWhere: () => Record<string, any>;
    searchQuery: string;
}

export const ContentEntriesListContext = React.createContext<
    ContentEntriesListProviderContext | undefined
>(undefined);

interface ContentEntriesListProviderProps {
    children: React.ReactNode;
}

export const ContentEntriesListProvider = ({ children }: ContentEntriesListProviderProps) => {
    const { history } = useRouter();
    const { contentModel } = useContentEntries();
    const { currentFolderId } = useNavigateFolder();

    const {
        folders: initialFolders,
        isListLoading,
        isListLoadingMore,
        isSearch,
        listMoreRecords,
        listTitle,
        meta,
        records: initialRecords,
        selected,
        setSearchQuery,
        setListSort,
        setFilters,
        setSelected,
        showFilters,
        hideFilters,
        showingFilters,
        showingSelectAll,
        isSelectedAll,
        selectAll,
        unselectAll,
        getWhere
    } = useAcoList<CmsContentEntry>();

    const [sorting, setSorting] = useState<Sorting>([]);
    const [search, setSearch] = useState<string>("");
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("search") || "";
    const baseUrl = `${CMS_ENTRY_LIST_LINK}/${contentModel.modelId}`;

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
                history.push(`${baseUrl}?${query.toString()}`);
            }
        }, 500),
        [baseUrl]
    );

    // Set "search" from search "query" on page load.
    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    // When "search" changes, trigger search-related logics
    useEffect(() => {
        updateSearch({ search, query });
    }, [search]);

    const onSelectRow: ContentEntriesListProviderContext["onSelectRow"] = rows => {
        const items = rows.filter(item => item.$type === "RECORD");

        const cmsContentEntries = items.map(item => item.data as CmsContentEntry);

        setSelected(cmsContentEntries);
    };

    const getEntryEditUrl = useCallback(
        (entry: CmsContentEntry): string => {
            const folderPath = currentFolderId
                ? `&folderId=${encodeURIComponent(currentFolderId)}`
                : "";

            const idPath = encodeURIComponent(entry.id);

            return `${baseUrl}?id=${idPath}${folderPath}`;
        },
        [baseUrl, currentFolderId]
    );

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

    const navigateTo = useCallback(
        (input?: string) => {
            const folderId = encodeURIComponent(input || currentFolderId || ROOT_FOLDER);

            history.push(`${baseUrl}?folderId=${folderId}`);
        },
        [currentFolderId, baseUrl]
    );

    const context: ContentEntriesListProviderContext = {
        modelId: contentModel.modelId,
        folderId: currentFolderId || ROOT_FOLDER,
        navigateTo,
        folders: initialFolders,
        getEntryEditUrl,
        isListLoading,
        isListLoadingMore,
        isSearch,
        listTitle,
        listMoreRecords,
        meta,
        onSelectRow,
        records: initialRecords,
        search,
        selected,
        setSelected,
        setSearch,
        sorting,
        setSorting,
        showingFilters,
        showFilters,
        hideFilters,
        setFilters,
        showingSelectAll,
        isSelectedAll,
        selectAll,
        unselectAll,
        getWhere,
        searchQuery
    };

    return (
        <ContentEntriesListContext.Provider value={context}>
            {children}
        </ContentEntriesListContext.Provider>
    );
};

export const useContentEntriesList = makeDecoratable((): ContentEntriesListProviderContext => {
    const context = React.useContext(ContentEntriesListContext);

    if (!context) {
        throw new Error("useContentEntriesList must be used within a ContentEntriesListContext");
    }

    return context;
});
