import React, { useCallback, useEffect, useMemo, useState } from "react";
import type {
    BindComponentRenderProp,
    CmsContentEntry,
    CmsModelFieldRendererProps,
    CmsModel
} from "~/types";
import { Options } from "./Options";
import { useReferences } from "../hooks/useReferences";
import { Entry } from "./Entry";
import { ReferencesDialog } from "./ReferencesDialog";
import { NoEntries } from "./NoEntries";
import { Container } from "./Container";
import { useQuery, useModelFieldGraphqlContext } from "~/admin/hooks";
import type { ListCmsModelsQueryResponse } from "~/admin/viewsGraphql";
import * as GQL from "~/admin/viewsGraphql";
import { useSnackbar } from "@webiny/app-admin";
import type { CmsReferenceValue } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { NewReferencedEntryDialog } from "~/admin/plugins/fieldRenderers/ref/components/NewReferencedEntryDialog";
import { FormComponentErrorMessage, FormComponentLabel, OverlayLoader } from "@webiny/admin-ui";

interface AdvancedSingleReferenceFieldProps extends CmsModelFieldRendererProps {
    bind: BindComponentRenderProp<CmsReferenceValue | null>;
}

export const AdvancedSingleReferenceField = (props: AdvancedSingleReferenceFieldProps) => {
    const { bind, field } = props;
    const { showSnackbar } = useSnackbar();

    const [linkEntryDialogModel, setLinkEntryDialogModel] = useState<CmsModel | null>(null);
    const [newEntryDialogModel, setNewEntryDialogModel] = useState<CmsModel | null>(null);
    const [loadedModels, setLoadedModels] = useState<CmsModel[]>([]);
    const requestContext = useModelFieldGraphqlContext();

    const { data, loading: loadingModels } = useQuery<ListCmsModelsQueryResponse>(
        GQL.LIST_CONTENT_MODELS,
        {
            context: requestContext
        }
    );

    useEffect(() => {
        if (loadingModels || !data?.listContentModels?.data) {
            return;
        } else if (data.listContentModels.error) {
            setLoadedModels([]);
            showSnackbar(data.listContentModels.error.message);
            return;
        }
        setLoadedModels(data.listContentModels.data);
    }, [data]);

    const onNewRecord = useCallback(
        (modelId: string) => {
            const model = loadedModels.find(model => model.modelId === modelId);
            if (!model) {
                console.log(`Cannot find model by modelId "${modelId}".`);
                return;
            }
            setNewEntryDialogModel(model);
        },
        [loadedModels, linkEntryDialogModel]
    );

    const onNewEntryDialogClose = useCallback(() => {
        setNewEntryDialogModel(null);
    }, [linkEntryDialogModel]);

    const onExistingRecord = useCallback(
        (modelId: string) => {
            const model = loadedModels.find(model => model.modelId === modelId);
            if (!model) {
                console.log(`Cannot find model by modelId "${modelId}".`);
                return;
            }
            setLinkEntryDialogModel(model);
        },
        [loadedModels, linkEntryDialogModel]
    );

    const onLinkEntryDialogClose = useCallback(() => {
        setLinkEntryDialogModel(null);
    }, []);

    const { entries, loading: loadingEntries } = useReferences({
        values: bind.value,
        requestContext
    });

    const onRemove = useCallback(() => {
        bind.onChange(null);
    }, [entries]);

    const models = useMemo(() => {
        if (!loadedModels || !field.settings?.models) {
            return [];
        }

        return (field.settings?.models || [])
            .map(({ modelId }) => {
                return loadedModels.find(model => model.modelId === modelId);
            })
            .filter(Boolean) as CmsModel[];
    }, [loadedModels, entries]);

    const loading = loadingEntries || loadingModels;

    const storeValues = useCallback(
        (values: CmsReferenceValue[]) => {
            if (values.length > 1) {
                console.log("More than one value selected. This should never happen.");
                return;
            } else if (values.length === 0 || !values[0]?.id) {
                bind.onChange(null);
                return;
            }
            bind.onChange(values[0]);
        },
        [bind.value, bind.onChange, entries]
    );

    const onNewEntryCreate = useCallback(
        (data: CmsContentEntry | null) => {
            if (!data) {
                console.log(
                    `Could not store new entry to the reference field. Missing whole entry.`
                );
                return;
            } else if (!data.id) {
                console.log(
                    `Could not store new entry to the reference field. Missing "id" value.`
                );
                return;
            } else if (!data.modelId) {
                console.log(
                    `Could not store new entry to the reference field. Missing "modelId" value.`
                );
                return;
            }
            storeValues([
                {
                    id: data.id,
                    modelId: data.modelId
                }
            ]);
        },
        [storeValues]
    );

    const initialValue = useMemo(() => {
        if (entries.length === 0 || loadedModels.length === 0) {
            return null;
        }
        const entry = entries[0];
        if (!entry) {
            return null;
        }
        const model = loadedModels.find(model => model.modelId === entry.model.modelId);
        if (!model) {
            return null;
        }
        return {
            entry,
            model
        };
    }, [entries, loadedModels]);

    const { validation } = bind;
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <>
            <FormComponentLabel text={field.label} invalid={invalid} />
            <Container className={"webiny_ref-field-container"}>
                {loading && <OverlayLoader size={"md"} />}
                {initialValue ? (
                    <Entry
                        model={initialValue.model}
                        placement="singleRefField"
                        index={0}
                        entry={initialValue.entry}
                        onRemove={onRemove}
                    />
                ) : (
                    <NoEntries text={"No record found"} />
                )}
            </Container>
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <Options
                models={models}
                onNewRecord={onNewRecord}
                onLinkExistingRecord={onExistingRecord}
            />

            {newEntryDialogModel && (
                <NewReferencedEntryDialog
                    model={newEntryDialogModel}
                    onClose={onNewEntryDialogClose}
                    onChange={onNewEntryCreate}
                />
            )}

            {linkEntryDialogModel && (
                <ReferencesDialog
                    {...props}
                    multiple={false}
                    values={bind.value ? [bind.value] : []}
                    contentModel={linkEntryDialogModel}
                    storeValues={storeValues}
                    onDialogClose={onLinkEntryDialogClose}
                />
            )}
        </>
    );
};
