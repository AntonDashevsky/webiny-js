import React, { useEffect, useCallback, useState } from "react";
import get from "lodash/get.js";
import { useApolloClient } from "@apollo/react-hooks";
import { plugins } from "@webiny/plugins";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import SaveDialog from "./SaveDialog.js";
import createElementPlugin from "~/admin/utils/createElementPlugin.js";
import { useKeyHandler } from "~/editor/hooks/useKeyHandler.js";
import { CREATE_PAGE_ELEMENT } from "~/admin/graphql/pages.js";
import {
    PbEditorPageElementPlugin,
    PbEditorPageElementSaveActionPlugin,
    PbEditorElement as BasePbEditorElement,
    PbElement,
    PbEditorElement
} from "~/types.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { removeElementId } from "~/editor/helpers.js";
import { useActiveElement } from "~/editor/hooks/useActiveElement.js";
import { usePageBlocks } from "~/admin/contexts/AdminPageBuilder/PageBlocks/usePageBlocks.js";

interface PbEditorElementWithSource extends PbEditorElement {
    source: string;
}

const pluginOnSave = (element: BasePbEditorElement): BasePbEditorElement => {
    const plugin = plugins
        .byType<PbEditorPageElementSaveActionPlugin>("pb-editor-page-element-save-action")
        .find(pl => pl.elementType === element.type);
    if (!plugin) {
        return element;
    }
    return plugin.onSave(element);
};

export interface SaveBlockFormData {
    id: string;
    name: string;
    type: "block";
    blockCategory: string;
    overwrite?: boolean;
}

export interface SaveElementFormData {
    id: string;
    name: string;
    type: "element";
}

const SaveAction = ({ children }: { children: React.ReactElement }) => {
    const [element] = useActiveElement<PbEditorElementWithSource>();
    const { addKeyHandler, removeKeyHandler } = useKeyHandler();
    const { getElementTree } = useEventActionHandler();
    const { showSnackbar } = useSnackbar();
    const [isDialogOpened, setOpenDialog] = useState<boolean>(false);
    const client = useApolloClient();
    const { createBlock, updateBlock } = usePageBlocks();

    const onSubmit = async (formData: SaveElementFormData | SaveBlockFormData) => {
        const pbElement = (await getElementTree({ element })) as PbElement;
        const newContent = pluginOnSave(removeElementId(pbElement));

        if (formData.type === "block") {
            // We can create a new block, or update an existing one.
            try {
                if (formData.overwrite) {
                    await updateBlock({
                        id: element.source,
                        content: newContent
                    });
                } else {
                    await createBlock({
                        name: formData.name,
                        category: formData.blockCategory,
                        content: newContent
                    });
                }
            } catch (error) {
                showSnackbar(error.message);
                return;
            }

            hideDialog();

            showSnackbar(
                <span>
                    {formData.type[0].toUpperCase() + formData.type.slice(1)}{" "}
                    <strong>{formData.name}</strong> was saved!
                </span>
            );
        } else {
            const { data: res } = await client.mutate({
                mutation: CREATE_PAGE_ELEMENT,
                variables: {
                    data: {
                        name: formData.name,
                        type: formData.type,
                        content: newContent
                    }
                }
            });

            hideDialog();

            const data = get(res, `pageBuilder.createPageElement.data`);

            createElementPlugin(data);

            showSnackbar(
                <span>
                    {formData.type[0].toUpperCase() + formData.type.slice(1)}{" "}
                    <strong>{data.name}</strong> was saved!
                </span>
            );
        }
    };

    useEffect(() => {
        isDialogOpened ? addKeyHandler("escape", hideDialog) : removeKeyHandler("escape");
    }, [isDialogOpened]);

    const showDialog = useCallback(() => setOpenDialog(true), []);
    const hideDialog = useCallback(() => setOpenDialog(false), []);

    if (!element) {
        return null;
    }

    const plugin = plugins
        .byType<PbEditorPageElementPlugin>("pb-editor-page-element")
        .find(pl => pl.elementType === element.type);

    if (!plugin) {
        return null;
    }

    return (
        <>
            <SaveDialog
                key={element.id}
                element={element}
                open={isDialogOpened}
                onClose={hideDialog}
                onSubmit={data => onSubmit(data)}
                type={element.type === "block" ? "block" : "element"}
            />
            {React.cloneElement(children, {
                onClick: showDialog
            })}
        </>
    );
};

export default SaveAction;
