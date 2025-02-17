import React, { useCallback, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import {
    FileManagerViewConfig,
    useFileManagerViewConfig
} from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig.js";
import { useFileModel } from "~/hooks/useFileModel.js";
import { BatchDTO } from "~/components/BulkActions/ActionEdit/domain/index.js";
import { BatchEditorDialog } from "./BatchEditorDialog/index.js";
import { ActionEditPresenter } from "./ActionEditPresenter.js";
import { useActionEditWorker } from "~/components/BulkActions/ActionEdit/useActionEditWorker.js";

const { useButtons } = FileManagerViewConfig.Browser.BulkAction;

export const ActionEdit = observer(() => {
    const { fields: allModelFields } = useFileModel();
    const config = useFileManagerViewConfig();
    const { IconButton } = useButtons();

    const fields = useMemo(() => {
        if (!config.fileDetails.fields.find(field => field.name === "tags")) {
            return allModelFields.filter(field => field.fieldId !== "tags");
        }

        return allModelFields;
    }, [config, allModelFields]);

    const worker = useActionEditWorker(fields);

    const presenter = useMemo<ActionEditPresenter>(() => {
        return new ActionEditPresenter();
    }, []);

    useEffect(() => {
        presenter.load(fields);
    }, [fields]);

    const onBatchEditorSubmit = useCallback(
        (batch: BatchDTO) => {
            presenter.closeEditor();
            worker.openWorkerDialog(batch);
        },
        [worker.openWorkerDialog]
    );

    if (!presenter.vm.show) {
        return null;
    }

    if (!worker.canEditAll) {
        console.log("You don't have permissions to edit files.");
        return null;
    }

    return (
        <>
            <IconButton
                icon={<EditIcon />}
                onAction={() => presenter.openEditor()}
                label={`Edit ${worker.filesLabel}`}
                tooltipPlacement={"bottom"}
            />
            <BatchEditorDialog
                onClose={() => presenter.closeEditor()}
                fields={presenter.vm.fields}
                batch={presenter.vm.currentBatch}
                vm={presenter.vm.editorVm}
                onApply={onBatchEditorSubmit}
            />
        </>
    );
});
