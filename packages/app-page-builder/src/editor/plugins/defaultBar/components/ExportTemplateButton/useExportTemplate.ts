import { useEffect, useState } from "react";
import get from "lodash/get.js";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useDialog } from "@webiny/app-admin/hooks/useDialog.js";
import { EXPORT_TEMPLATES } from "~/admin/graphql/templateImportExport.gql.js";
import useExportTemplateDialog from "./useExportTemplateDialog.js";

const useExportTemplate = () => {
    const [taskId, setTaskId] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();
    const { showExportTemplateLoadingDialog } = useExportTemplateDialog();
    const { hideDialog } = useDialog();

    const [exportTemplate] = useMutation(EXPORT_TEMPLATES, {
        onCompleted: response => {
            const { error, data } = get(response, "pageBuilder.exportTemplates", {});
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
            showExportTemplateLoadingDialog(taskId);
        }
    }, [taskId]);

    return {
        exportTemplate
    };
};

export default useExportTemplate;
