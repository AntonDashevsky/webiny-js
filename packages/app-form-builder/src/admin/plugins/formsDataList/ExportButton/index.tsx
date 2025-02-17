import React from "react";
import { IconButton } from "@webiny/ui/Button/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { i18n } from "@webiny/app/i18n/index.js";
import useExportFormDialog, { ExportFormsDialogProps } from "./useExportFormDialog.js";
import useExportFormRevisionSelectorDialog from "./useExportFormRevisionSelectorDialog.js";
// assets
import { ReactComponent as DownloadIcon } from "@material-design-icons/svg/round/download.svg";

const t = i18n.ns("app-form-builder/admin/plugins/editor/defaultBar/exportFormButton");

interface ExportFormsButtonProps extends ExportFormsDialogProps {
    getMultiSelected: any;
}

export const ExportFormsButton = ({ getMultiSelected, ...restProps }: ExportFormsButtonProps) => {
    const selected = getMultiSelected();
    const { showExportFormRevisionSelectorDialog } = useExportFormRevisionSelectorDialog();
    const { showExportFormInitializeDialog } = useExportFormDialog();

    const renderExportFormsTooltip = (selected: string[]) => {
        const count = selected.length;
        if (count > 0) {
            return t`Export {count|count:1:form:default:forms}.`({
                count
            });
        }

        return t`Export all forms`;
    };

    return (
        <Tooltip content={renderExportFormsTooltip(selected)} placement={"bottom"}>
            <IconButton
                data-testid={"export-form-button"}
                icon={<DownloadIcon />}
                onClick={() => {
                    showExportFormRevisionSelectorDialog({
                        onAccept: () =>
                            showExportFormInitializeDialog({ ids: selected, ...restProps }),
                        selected
                    });
                }}
            />
        </Tooltip>
    );
};
