import React from "react";
import { useToast } from "@webiny/admin-ui";
import { useRoute, useRouter } from "@webiny/app-admin";
import { useHandlers } from "@webiny/app/hooks/useHandlers.js";
import type { CmsContentEntry } from "~/types.js";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/useContentEntry.js";
import type { PublishEntryRevisionResponse } from "~/admin/contexts/Cms/index.js";
import { Routes } from "~/routes.js";

export interface CreateRevisionHandler {
    (id?: string): Promise<void>;
}

export interface EditRevisionHandler {
    (id?: string): void;
}

export interface DeleteRevisionHandler {
    (id?: string): Promise<void>;
}

export interface PublishRevisionHandler {
    (id?: string): Promise<PublishEntryRevisionResponse>;
}

export interface UnpublishRevisionHandler {
    (id?: string): Promise<void>;
}

interface UseRevisionHandlers {
    createRevision: CreateRevisionHandler;
    editRevision: EditRevisionHandler;
    deleteRevision: DeleteRevisionHandler;
    publishRevision: PublishRevisionHandler;
    unpublishRevision: UnpublishRevisionHandler;
}

export interface UseRevisionProps {
    revision: Pick<CmsContentEntry, "id"> & {
        meta: Pick<CmsContentEntry["meta"], "version">;
    };
}

export const useRevision = ({ revision }: UseRevisionProps) => {
    const contentEntry = useContentEntry();
    const { goToRoute } = useRouter();
    const { route } = useRoute(Routes.ContentEntries.List);
    const { showSuccessToast, showWarningToast } = useToast();
    const { contentModel } = contentEntry;
    const { modelId } = contentModel;

    const { createRevision, editRevision, deleteRevision, publishRevision, unpublishRevision } =
        useHandlers<UseRevisionHandlers>(
            { entry: revision, contentEntryHook: contentEntry },
            {
                createRevision:
                    ({ contentEntryHook }): CreateRevisionHandler =>
                    async (id): Promise<void> => {
                        const { entry, error } = await contentEntryHook.createEntryRevisionFrom({
                            id: id || revision.id
                        });

                        if (error) {
                            showWarningToast(error.message);
                            return;
                        }

                        goToRoute(Routes.ContentEntries.List, {
                            ...route.params,
                            id: entry.id
                        });
                    },
                editRevision:
                    (): EditRevisionHandler =>
                    (id): void => {
                        goToRoute(Routes.ContentEntries.List, {
                            ...route.params,
                            id: id || revision.id
                        });
                    },
                deleteRevision:
                    ({ entry, contentEntryHook }): DeleteRevisionHandler =>
                    async (id): Promise<void> => {
                        const revisionId = id || entry.id;

                        const response = await contentEntryHook.deleteEntryRevision({
                            id: revisionId
                        });

                        if (typeof response === "object" && response.error) {
                            return;
                        }

                        const { newLatestRevision } = response;

                        goToRoute(Routes.ContentEntries.List, {
                            modelId,
                            id: newLatestRevision?.id
                        });
                    },
                publishRevision:
                    ({ entry, contentEntryHook }): PublishRevisionHandler =>
                    async id => {
                        const response = await contentEntryHook.publishEntryRevision({
                            id: id || entry.id
                        });

                        if (response.error) {
                            showWarningToast({
                                title: "Failed to publish",
                                description: response.error.message
                            });
                            return response;
                        }

                        showSuccessToast({
                            title: "Revision published!",
                            description: (
                                <span>
                                    Successfully published revision{" "}
                                    <strong>#{response.entry.meta.version}</strong>!
                                </span>
                            )
                        });

                        return response;
                    },
                unpublishRevision:
                    ({ entry, contentEntryHook }): UnpublishRevisionHandler =>
                    async id => {
                        const { error } = await contentEntryHook.unpublishEntryRevision({
                            id: id || entry.id
                        });

                        if (error) {
                            showWarningToast({
                                title: "Failed to unpublish",
                                description: error.message
                            });
                            return;
                        }

                        showSuccessToast({
                            title: "Revision unpublished",
                            description: (
                                <span>
                                    Successfully unpublished revision{" "}
                                    <strong>#{revision.meta.version}</strong>!
                                </span>
                            )
                        });
                    }
            }
        );

    return {
        createRevision,
        editRevision,
        deleteRevision,
        publishRevision,
        unpublishRevision
    };
};
