import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRoute, useRouter } from "@webiny/app/router.js";
import { useIsMounted, useSnackbar } from "@webiny/app-admin";
import { useCms, useQuery } from "~/admin/hooks/index.js";
import type { ContentEntriesContext } from "~/admin/views/contentEntries/ContentEntriesContext.js";
import { useContentEntries } from "~/admin/views/contentEntries/hooks/useContentEntries.js";
import type { CmsContentEntry, CmsContentEntryRevision } from "~/types.js";
import { parseIdentifier } from "@webiny/utils";
import type {
    CmsEntryGetQueryResponse,
    CmsEntryGetQueryVariables
} from "@webiny/app-headless-cms-common";
import { createReadQuery } from "@webiny/app-headless-cms-common";
import { getFetchPolicy } from "~/utils/getFetchPolicy.js";
import { useRecords } from "@webiny/app-aco";
import type * as Cms from "~/admin/contexts/Cms/index.js";
import { useMockRecords } from "./useMockRecords.js";
import { ROOT_FOLDER } from "~/admin/constants.js";
import type { OperationError } from "~/admin/contexts/Cms/index.js";
import { Routes } from "~/routes.js";

interface UpdateListCacheOptions {
    options?: {
        addItemToListCache?: boolean;
    };
}

export type GetEntryParams = Omit<Cms.GetEntryParams, "model">;
export type CreateEntryParams = Omit<Cms.CreateEntryParams, "model"> & UpdateListCacheOptions;
export type CreateEntryRevisionFromParams = Omit<Cms.CreateEntryRevisionFromParams, "model">;
export type UpdateEntryRevisionParams = Omit<Cms.UpdateEntryRevisionParams, "model">;
export type PublishEntryRevisionParams = Omit<Cms.PublishEntryRevisionParams, "model">;
export type UnpublishEntryRevisionParams = Omit<Cms.UnpublishEntryRevisionParams, "model">;
export type DeleteEntryParams = Omit<Cms.DeleteEntryParams, "model">;
export type DeleteEntryRevisionParams = DeleteEntryParams;

export interface DeleteEntryRevisionOperationSuccess {
    newLatestRevision: CmsContentEntryRevision;
    error?: never;
}

export type DeleteEntryRevisionResponse = OperationError | DeleteEntryRevisionOperationSuccess;

export interface ContentEntryCrud {
    getEntry: (params: GetEntryParams) => Promise<Cms.GetEntryResponse>;
    createEntry: (params: CreateEntryParams) => Promise<Cms.CreateEntryResponse>;
    createEntryRevisionFrom: (
        params: CreateEntryRevisionFromParams
    ) => Promise<Cms.CreateEntryRevisionFromResponse>;
    updateEntryRevision: (
        params: UpdateEntryRevisionParams
    ) => Promise<Cms.UpdateEntryRevisionResponse>;
    publishEntryRevision: (
        params: PublishEntryRevisionParams
    ) => Promise<Cms.PublishEntryRevisionResponse>;
    unpublishEntryRevision: (
        params: UnpublishEntryRevisionParams
    ) => Promise<Cms.UnpublishEntryRevisionResponse>;
    deleteEntry: (params: DeleteEntryParams) => Promise<Cms.DeleteEntryResponse>;
    deleteEntryRevision: (
        params: DeleteEntryRevisionParams
    ) => Promise<DeleteEntryRevisionResponse>;
}

export interface ContentEntryContext extends ContentEntriesContext, ContentEntryCrud {
    entry: CmsContentEntry;
    loading: boolean;
    revisions: CmsContentEntryRevision[];
    refetchContent: () => void;

    setActiveTab(index: string): void;

    activeTab: string;
    showEmptyView: boolean;
}

export const ContentEntryContext = React.createContext<ContentEntryContext | undefined>(undefined);

export interface ContentEntryContextProviderProps extends Partial<UseContentEntryProviderProps> {
    /**
     * This prop is used when you need to mount this provider outside the main content entry view, with limited features.
     * Example: Model Editor "preview" tab.
     */
    readonly?: boolean;
    children: React.ReactNode;
    currentFolderId?: string;
}

interface UseContentEntryProviderProps {
    getContentId: () => string | undefined;
    isNewEntry: () => boolean;
}

export const useContentEntryProviderProps = (): UseContentEntryProviderProps => {
    const { route } = useRoute(Routes.ContentEntries.List);

    const isNewEntry = () => {
        return route.params.new ?? false;
    };

    const getContentId = () => {
        return route.params.id;
    };

    return {
        getContentId,
        isNewEntry
    };
};

export const ContentEntryProvider = ({
    children,
    isNewEntry,
    readonly,
    getContentId,
    currentFolderId
}: ContentEntryContextProviderProps) => {
    const { isMounted } = useIsMounted();
    const [activeTab, setActiveTab] = useState("content");
    const [entry, setEntry] = useState<CmsContentEntry>();
    const [revisions, setRevisions] = useState<CmsContentEntryRevision[]>([]);
    const { contentModel: model, canCreate } = useContentEntries();
    const { goToRoute } = useRouter();
    const { showSnackbar } = useSnackbar();
    const cms = useCms();
    const { addRecordToCache, updateRecordInCache, removeRecordFromCache } = readonly
        ? useMockRecords()
        : useRecords();
    const [isLoading, setLoading] = useState<boolean>(false);
    const contentEntryProviderProps = useContentEntryProviderProps();

    const updateRevisionInRevisionsCache = useCallback(
        (updatedRevisions: CmsContentEntryRevision | CmsContentEntryRevision[]) => {
            const updatedRevisionsArray = Array.isArray(updatedRevisions)
                ? updatedRevisions
                : [updatedRevisions];

            setRevisions(revisions => {
                return revisions.map(revision => {
                    const updatedRevision = updatedRevisionsArray.find(
                        updatedRevision => updatedRevision.id === revision.id
                    );

                    return updatedRevision || revision;
                });
            });
        },
        []
    );

    const newEntry =
        typeof isNewEntry === "function" ? isNewEntry() : contentEntryProviderProps.isNewEntry();
    const contentId =
        typeof getContentId === "function"
            ? getContentId()
            : contentEntryProviderProps.getContentId();

    const revisionId = contentId ? decodeURIComponent(contentId) : null;
    let entryId: string | null = null;
    let version: number | null = null;
    if (revisionId) {
        const result = parseIdentifier(revisionId);
        entryId = result.id;
        version = result.version;
    }

    useEffect(() => {
        if (!revisionId && entry) {
            setEntry(undefined);
        }
        setActiveTab("content");
    }, [revisionId]);

    const { READ_CONTENT } = useMemo(() => {
        return {
            READ_CONTENT: createReadQuery(model)
        };
    }, [model.modelId]);

    let variables: CmsEntryGetQueryVariables | undefined;
    if (version === null && entryId) {
        variables = {
            entryId
        };
    } else {
        variables = {
            revision: revisionId as string
        };
    }

    // TODO: refactor to use `getEntry` from useCms()
    const loadEntry = useQuery<CmsEntryGetQueryResponse, CmsEntryGetQueryVariables>(READ_CONTENT, {
        variables,
        skip: !revisionId,
        fetchPolicy: getFetchPolicy(model),
        onCompleted: response => {
            if (!response || !isMounted()) {
                return;
            }

            const { data, error } = response.content;
            if (!error) {
                setEntry(data);
                return;
            }
            goToRoute(Routes.ContentEntries.List, { modelId: model.modelId });
            showSnackbar(error.message);
        }
    });

    const loading = isLoading || loadEntry.loading;

    useEffect(() => {
        if (!entryId) {
            return;
        }

        cms.listEntryRevisions({
            model,
            id: entryId
        }).then(response => {
            if (response.error) {
                return;
            }
            setRevisions(response.revisions);
        });
    }, [entryId]);

    // CRUD methods
    const getEntry: ContentEntryCrud["getEntry"] = async ({ id }) => {
        return await cms.getEntry({ model, id });
    };

    const createEntry: ContentEntryCrud["createEntry"] = async ({ entry, options }) => {
        setLoading(true);
        const response = await cms.createEntry({
            model,
            entry: {
                ...entry,
                wbyAco_location: {
                    folderId: currentFolderId || ROOT_FOLDER
                }
            },
            options: { skipValidators: options?.skipValidators }
        });
        setLoading(false);
        if (response.entry && options?.addItemToListCache) {
            addRecordToCache(response.entry);
        }

        // The `ContentEntryForm` component reads the `entry` from the context, and we want it to have the latest state.
        // This way, the form also knows whether it's `pristine` or not.
        setEntry(response.entry);

        return response;
    };

    const createEntryRevisionFrom: ContentEntryCrud["createEntryRevisionFrom"] = async params => {
        setLoading(true);
        const response = await cms.createEntryRevisionFrom({ model, ...params });
        setLoading(false);
        if (response.entry) {
            setEntry(response.entry);
            setRevisions([response.entry, ...revisions]);
            updateRecordInCache(response.entry);
        }
        return response;
    };

    const updateEntryRevision: ContentEntryCrud["updateEntryRevision"] = async params => {
        setLoading(true);
        const response = await cms.updateEntryRevision({ model, ...params });
        setLoading(false);
        if (response.entry) {
            setEntry(response.entry);
            updateRecordInCache(response.entry);
            updateRevisionInRevisionsCache(response.entry);
        }
        return response;
    };

    const deleteEntry: ContentEntryCrud["deleteEntry"] = async params => {
        const response = await cms.deleteEntry({ model, ...params });
        removeRecordFromCache(params.id);
        return response;
    };

    const deleteEntryRevision: ContentEntryCrud["deleteEntryRevision"] = async params => {
        const response = await cms.deleteEntry({ model, ...params });
        if (typeof response === "object" && response.error) {
            return response;
        }

        const updatedRevisionsList = revisions.filter(rev => rev.id !== params.id);
        setRevisions(updatedRevisionsList);

        const [newLatestRevision] = updatedRevisionsList;

        if (newLatestRevision) {
            updateRecordInCache(newLatestRevision);
        } else {
            removeRecordFromCache(params.id);
        }

        return { newLatestRevision };
    };

    const publishEntryRevision: ContentEntryCrud["publishEntryRevision"] = async params => {
        const response = await cms.publishEntryRevision({ model, ...params });
        if (response.entry) {
            setEntry(response.entry);
            updateRecordInCache(response.entry);

            const revisionsToUpdateInRevisionsCache: CmsContentEntryRevision[] = [response.entry];

            const previousPublishedRevision = revisions.find(
                rev => rev.meta.status === "published"
            );

            if (previousPublishedRevision) {
                revisionsToUpdateInRevisionsCache.push({
                    ...previousPublishedRevision,
                    meta: {
                        ...previousPublishedRevision.meta,
                        status: "unpublished"
                    }
                });
            }

            updateRevisionInRevisionsCache(revisionsToUpdateInRevisionsCache);
        }
        return response;
    };

    const unpublishEntryRevision: ContentEntryCrud["unpublishEntryRevision"] = async params => {
        const response = await cms.unpublishEntryRevision({ model, ...params });
        if (response.entry) {
            setEntry(response.entry);
            updateRecordInCache(response.entry);
            updateRevisionInRevisionsCache(response.entry);
        }
        return response;
    };

    const value: ContentEntryContext = {
        activeTab,
        canCreate,
        contentModel: model,
        getEntry,
        createEntry,
        createEntryRevisionFrom,
        deleteEntry,
        deleteEntryRevision,
        entry: (entry || {}) as CmsContentEntry,
        loading,
        publishEntryRevision,
        refetchContent: loadEntry.refetch,
        revisions,
        setActiveTab,
        showEmptyView: !newEntry && !loading && !revisionId,
        unpublishEntryRevision,
        updateEntryRevision
    };

    return <ContentEntryContext.Provider value={value}>{children}</ContentEntryContext.Provider>;
};

ContentEntryProvider.displayName = "ContentEntryProvider";
