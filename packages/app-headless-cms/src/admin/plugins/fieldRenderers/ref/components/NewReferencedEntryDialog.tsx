import React, { useCallback, useEffect, useRef, useState } from "react";
import { ContentEntryProvider } from "~/admin/views/contentEntries/ContentEntry/ContentEntryContext";
import { FoldersProvider } from "@webiny/app-aco/contexts/folders";
import { ContentEntriesProvider } from "~/admin/views/contentEntries/ContentEntriesContext";
import { i18n } from "@webiny/app/i18n";
import type { CmsContentEntry, CmsModel } from "~/types";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/useContentEntry";
import { ModelProvider } from "~/admin/components/ModelProvider";
import { ContentEntryForm } from "~/admin/components/ContentEntryForm/ContentEntryForm";
import type {
    GetCmsModelQueryResponse,
    GetCmsModelQueryVariables
} from "~/admin/graphql/contentModels";
import { GET_CONTENT_MODEL } from "~/admin/graphql/contentModels";
import { useCms } from "~/admin/hooks";
import { NavigateFolderProvider as AbstractNavigateFolderProvider } from "@webiny/app-aco/contexts/navigateFolder";
import { SearchRecordsProvider } from "@webiny/app-aco/contexts/records";
import { FolderTree, useNavigateFolder } from "@webiny/app-aco";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { usePersistEntry } from "~/admin/hooks/usePersistEntry";
import type { AcoAppProviderContext } from "@webiny/app-aco/contexts/app";
import { AcoAppContext, createAppFromModel } from "@webiny/app-aco/contexts/app";
import { Drawer, OverlayLoader } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields/ref");

interface SaveEntry {
    (): void;
}

interface EntryFormProps {
    onCreate: (entry: CmsContentEntry) => void;
    setSaveEntry: (cb: SaveEntry) => void;
}

const EntryForm = ({ onCreate, setSaveEntry }: EntryFormProps) => {
    const { contentModel, loading } = useContentEntry();
    const { persistEntry } = usePersistEntry({ addItemToListCache: false });
    const { currentFolderId, navigateToFolder } = useNavigateFolder();

    return (
        <ModelProvider model={contentModel}>
            <SplitView>
                <LeftPanel span={3}>
                    <div className={"wby-px-sm-extra wby-py-sm"}>
                        <FolderTree
                            focusedFolderId={currentFolderId}
                            onFolderClick={data => navigateToFolder(data.id)}
                            enableActions={true}
                            enableCreate={true}
                        />
                    </div>
                </LeftPanel>
                <RightPanel span={9}>
                    <div className={"wby-p-md wby-relative"}>
                        {loading ? <OverlayLoader text={"Creating entry..."} /> : null}
                        <ContentEntryForm
                            header={false}
                            entry={{}}
                            persistEntry={persistEntry}
                            onAfterCreate={entry => onCreate(entry)}
                            setSaveEntry={setSaveEntry}
                        />
                    </div>
                </RightPanel>
            </SplitView>
        </ModelProvider>
    );
};

interface NewReferencedEntryDialogProps {
    model: Pick<CmsModel, "modelId">;
    onClose: () => void;
    onChange: (entry: any) => void;
}

export const NewReferencedEntryDialog = ({
    model: baseModel,
    onClose,
    onChange
}: NewReferencedEntryDialogProps) => {
    const { apolloClient } = useCms();
    const [model, setModel] = useState<CmsModel | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const response = await apolloClient.query<
                GetCmsModelQueryResponse,
                GetCmsModelQueryVariables
            >({
                query: GET_CONTENT_MODEL,
                variables: {
                    modelId: baseModel.modelId
                }
            });
            setModel(response.data.getContentModel.data);
        })();
    }, [baseModel.modelId]);

    const onCreate = useCallback(
        (entry: CmsContentEntry) => {
            if (!model) {
                onClose();
                return;
            }
            onChange({
                ...entry,
                /*
                 * Format data for AutoComplete.
                 */
                published: entry.meta?.status === "published",
                modelId: model.modelId,
                modelName: model.name
            });
            onClose();
        },
        [onChange, model]
    );

    if (!model) {
        return null;
    }

    const acoAppContext: AcoAppProviderContext = {
        app: createAppFromModel({
            model,
            id: `cms:${model.modelId}`
        }),
        mode: "cms",
        client: apolloClient,
        model,
        folderIdPath: "wbyAco_location.folderId",
        folderIdInPath: "wbyAco_location.folderId_in",
        loading: false
    };

    return (
        <AcoAppContext.Provider value={acoAppContext}>
            <FoldersProvider>
                <SearchRecordsProvider>
                    <NavigateFolderProvider modelId={model.modelId}>
                        <ContentEntriesProvider
                            contentModel={model}
                            key={model.modelId}
                            insideDialog={true}
                        >
                            <ContentEntryProviderWithCurrentFolderId
                                model={model}
                                onClose={onClose}
                                onCreate={onCreate}
                            />
                        </ContentEntriesProvider>
                    </NavigateFolderProvider>
                </SearchRecordsProvider>
            </FoldersProvider>
        </AcoAppContext.Provider>
    );
};

const NavigateFolderProvider = ({
    modelId,
    children
}: {
    modelId: string;
    children: React.ReactNode;
}) => {
    const [folderId, setFolderId] = useState<string | undefined>(undefined);

    const navigateToFolder = useCallback((folderId: string) => {
        setFolderId(folderId);
    }, []);

    const navigateToListHome = useCallback(() => {
        setFolderId(undefined);
    }, []);

    return (
        <AbstractNavigateFolderProvider
            folderId={folderId}
            createStorageKey={() => `cms:${modelId}:create`}
            navigateToFolder={navigateToFolder}
            navigateToLatestFolder={navigateToFolder}
            navigateToListHome={navigateToListHome}
        >
            {children}
        </AbstractNavigateFolderProvider>
    );
};

interface ContentEntryProviderWithCurrentFolderIdProps {
    model: CmsModel;
    onClose: () => void;
    onCreate: (entry: CmsContentEntry) => void;
}

const ContentEntryProviderWithCurrentFolderId = ({
    model,
    onClose,
    onCreate
}: ContentEntryProviderWithCurrentFolderIdProps) => {
    const saveEntryRef = useRef<SaveEntry>();
    const { currentFolderId } = useNavigateFolder();

    return (
        <ContentEntryProvider
            isNewEntry={() => true}
            getContentId={() => null}
            currentFolderId={currentFolderId}
        >
            <Drawer
                open={true}
                onClose={onClose}
                width={1000}
                modal={true}
                headerSeparator={true}
                footerSeparator={true}
                bodyPadding={false}
                title={t`New {modelName} Entry`({ modelName: model.name })}
                actions={
                    <>
                        <Drawer.CancelButton />
                        <Drawer.ConfirmButton
                            onClick={() => saveEntryRef.current && saveEntryRef.current()}
                            text={t`Create Entry`}
                        />
                    </>
                }
            >
                <EntryForm onCreate={onCreate} setSaveEntry={cb => (saveEntryRef.current = cb)} />
            </Drawer>
        </ContentEntryProvider>
    );
};
