import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useDialog } from "@webiny/app-admin/hooks/useDialog.js";
import {
    EXPORT_PAGES,
    type ExportPagesResponse,
    type ExportPagesVariables
} from "~/admin/graphql/pageImportExport.gql.js";
import useExportPageDialog from "./useExportPageDialog.js";

const useExportPage = () => {
    const [taskId, setTaskId] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();
    const { showExportPageLoadingDialog } = useExportPageDialog();
    const { hideDialog } = useDialog();

    const [exportPage] = useMutation<ExportPagesResponse, ExportPagesVariables>(EXPORT_PAGES, {
        onCompleted: response => {
            const { error, data } = response.pageBuilder?.exportPages || {};
            if (error) {
                hideDialog();
                showSnackbar(error.message);
                return;
            } else if (!data) {
                hideDialog();
                showSnackbar("Something unexpected happened - no task data.");
                return;
            }
            setTaskId(data.task.id);
        }
    });

    useEffect(() => {
        if (taskId) {
            showExportPageLoadingDialog(taskId);
        }
    }, [taskId]);

    return {
        exportPage
    };
};

export default useExportPage;
