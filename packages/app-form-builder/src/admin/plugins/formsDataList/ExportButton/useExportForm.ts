import { useEffect, useState } from "react";
import get from "lodash/get.js";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useDialog } from "@webiny/app-admin/hooks/useDialog.js";
import { EXPORT_FORMS } from "~/admin/graphql.js";
import useExportFormDialog from "./useExportFormDialog.js";

const useExportForm = () => {
    const [taskId, setTaskId] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();
    const { showExportFormLoadingDialog } = useExportFormDialog();
    const { hideDialog } = useDialog();

    const [exportForm] = useMutation(EXPORT_FORMS, {
        onCompleted: response => {
            const { error, data } = get(response, "formBuilder.exportForms", {});
            if (error) {
                hideDialog();
                showSnackbar(error.message);
                return;
            }
            setTaskId(data.task.id);
        }
    });

    useEffect(() => {
        if (taskId) {
            showExportFormLoadingDialog(taskId);
        }
    }, [taskId]);

    return {
        exportForm
    };
};

export default useExportForm;
