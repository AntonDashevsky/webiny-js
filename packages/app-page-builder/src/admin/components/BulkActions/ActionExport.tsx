import React, { useMemo } from "react";
import { ReactComponent as ExportIcon } from "@material-design-icons/svg/outlined/file_download.svg";
import { observer } from "mobx-react-lite";
import { PageListConfig } from "~/admin/config/pages/index.js";
import useExportPageRevisionSelectorDialog from "~/editor/plugins/defaultBar/components/ExportPageButton/useExportPageRevisionSelectorDialog.js";
import useExportPageDialog from "~/editor/plugins/defaultBar/components/ExportPageButton/useExportPageDialog.js";
import { getPagesLabel } from "~/admin/components/BulkActions/BulkActions.js";

export const ActionExport = observer(() => {
    const { showExportPageRevisionSelectorDialog } = useExportPageRevisionSelectorDialog();
    const { showExportPageInitializeDialog } = useExportPageDialog();

    const { useWorker, useButtons } = PageListConfig.Browser.BulkAction;
    const { IconButton } = useButtons();
    const worker = useWorker();

    const selected = useMemo(() => {
        return worker.items.map(item => item.data.pid);
    }, [worker.items]);

    const pagesLabel = useMemo(() => {
        return getPagesLabel(selected.length);
    }, [selected.length]);

    const openExportPagesDialog = () =>
        showExportPageRevisionSelectorDialog({
            onAccept: () => showExportPageInitializeDialog({ ids: selected }),
            selected
        });

    return (
        <IconButton
            icon={<ExportIcon />}
            onAction={openExportPagesDialog}
            label={`Export ${pagesLabel}`}
            tooltipPlacement={"bottom"}
        />
    );
});
