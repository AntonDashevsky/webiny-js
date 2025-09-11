import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as GQL from "~/admin/viewsGraphql.js";
import type { ListCmsModelsQueryResponse } from "~/admin/viewsGraphql.js";
import { withoutBeingDeletedModels } from "~/admin/viewsGraphql.js";
import type {
    BindComponentRenderProp,
    CmsContentEntry,
    CmsModel,
    CmsModelFieldRendererProps
} from "~/types.js";
import { Options } from "./Options.js";
import { useReferences } from "../hooks/useReferences.js";
import { Entry } from "./Entry.js";
import { Container } from "./Container.js";
import { ReferencesDialog } from "./ReferencesDialog.js";
import { useModelFieldGraphqlContext, useQuery } from "~/admin/hooks/index.js";
import { useSnackbar } from "@webiny/app-admin";
import type { CmsReferenceValue } from "~/admin/plugins/fieldRenderers/ref/components/types.js";
import { parseIdentifier } from "@webiny/utils";
import { Entries } from "./Entries.js";
import { NewReferencedEntryDialog } from "~/admin/plugins/fieldRenderers/ref/components/NewReferencedEntryDialog.js";
import {
    FormComponentErrorMessage,
    FormComponentLabel,
    OverlayLoader,
    Text
} from "@webiny/admin-ui";

const getRecordCountMessage = (count: number) => {
    switch (count) {
        case 0:
            return "no records selected";
        case 1:
            return "1 record selected";
        default:
            return `${count} records selected`;
    }
};

interface AdvancedMultipleReferenceFieldProps extends CmsModelFieldRendererProps {
    bind: BindComponentRenderProp<CmsReferenceValue[] | undefined | null>;
}

export const AdvancedMultipleReferenceField = (props: AdvancedMultipleReferenceFieldProps) => {
    const { bind, field } = props;
    const { showSnackbar } = useSnackbar();
    const requestContext = useModelFieldGraphqlContext();

    const values = useMemo(() => {
        return bind.value || [];
    }, [bind.value]);

    const [linkEntryDialogModel, setLinkEntryDialogModel] = useState<CmsModel | null>(null);
    const [newEntryDialogModel, setNewEntryDialogModel] = useState<CmsModel | null>(null);

    const [loadedModels, setLoadedModels] = useState<CmsModel[]>([]);

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
        setLoadedModels(withoutBeingDeletedModels(data.listContentModels.data));
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

    const {
        entries,
        loading: loadingEntries,
        loadMore
    } = useReferences({
        values,
        perPage: 10,
        requestContext
    });

    const onRemove = useCallback(
        (id: string) => {
            if (!values || !Array.isArray(values)) {
                return;
            }
            const { id: entryId } = parseIdentifier(id);
            const newValues = values.filter(value => {
                const { id: valueEntryId } = parseIdentifier(value.id);
                return valueEntryId !== entryId;
            });
            bind.onChange(newValues.length > 0 ? newValues : null);
        },
        [entries, values]
    );

    const models = useMemo(() => {
        if (!loadedModels || !field.settings?.models || !Array.isArray(field.settings.models)) {
            return [];
        }

        return field.settings.models.reduce<CmsModel[]>((collection, ref) => {
            const model = loadedModels.find(model => model.modelId === ref.modelId);
            if (!model) {
                return collection;
            }
            collection.push(model);

            return collection;
        }, []);
    }, [loadedModels, entries]);

    const storeValues = useCallback(
        (values: CmsReferenceValue[]) => {
            bind.onChange(values?.length ? values : null);
            return;
        },
        [values]
    );

    const onNewEntryCreate = useCallback(
        (data: Partial<CmsContentEntry> | null) => {
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
            storeValues(
                values.concat([
                    {
                        id: data.id,
                        modelId: data.modelId
                    }
                ])
            );
        },
        [storeValues]
    );

    const onMoveUp = useCallback(
        (index: number, toTop?: boolean) => {
            if (!values?.length) {
                return;
            } else if (toTop) {
                const arr = values.splice(index, 1);
                bind.onChange(arr.concat(values));
                return;
            }
            bind.moveValueUp(index);
        },
        [values]
    );
    const onMoveDown = useCallback(
        (index: number, toBottom?: boolean) => {
            if (!values?.length) {
                return;
            } else if (toBottom === true) {
                const arr = values.splice(index, 1);
                bind.onChange(values.concat(arr));
                return;
            }
            bind.moveValueDown(index);
        },
        [values]
    );

    const loading = loadingEntries || loadingModels;

    const message = getRecordCountMessage(values.length);

    const { validation } = bind;
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <>
            <div className={"wby-flex wby-items-center wby-justify-between"}>
                <FormComponentLabel text={field.label} invalid={invalid} />
                <Text size={"sm"}>({message})</Text>
            </div>
            <Container className={"webiny_ref-field-container"}>
                {loading && <OverlayLoader size={"md"} />}
                <Entries entries={entries} loadMore={loadMore}>
                    {(entry, index) => {
                        const isFirst = index === 0;
                        const isLast = index >= values.length - 1;
                        const model = loadedModels.find(
                            model => model.modelId === entry.model.modelId
                        );
                        if (!model) {
                            return null;
                        }
                        return (
                            <Entry
                                model={model}
                                placement="multiRef"
                                key={`reference-entry-${entry.id}`}
                                index={index}
                                entry={entry}
                                onRemove={onRemove}
                                onMoveUp={!isFirst ? onMoveUp : undefined}
                                onMoveDown={!isLast ? onMoveDown : undefined}
                            />
                        );
                    }}
                </Entries>
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
                    field={field}
                    multiple={true}
                    values={values}
                    contentModel={linkEntryDialogModel}
                    storeValues={storeValues}
                    onDialogClose={onLinkEntryDialogClose}
                />
            )}
        </>
    );
};
