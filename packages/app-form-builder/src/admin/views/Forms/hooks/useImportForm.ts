import { useCallback } from "react";
import get from "lodash/get.js";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { IMPORT_FORMS } from "~/admin/graphql.js";
import useImportFormDialog from "~/admin/plugins/formsDataList/ImportButton/useImportFormDialog.js";
import useImportFormLoadingDialog from "~/admin/plugins/formsDataList/ImportButton/useImportFormLoadingDialog.js";

const useImportForm = () => {
    const [importForm] = useMutation(IMPORT_FORMS);
    const { showSnackbar } = useSnackbar();
    const { showImportFormDialog } = useImportFormDialog();
    const { showImportFormLoadingDialog } = useImportFormLoadingDialog();

    const importFormMutation = useCallback(async (zipFileUrl: string) => {
        try {
            const res = await importForm({
                variables: {
                    zipFileUrl
                }
            });

            const { error, data } = get(res, "data.formBuilder.importForms", {});
            if (error) {
                showSnackbar(error.message);
                return;
            }

            showImportFormLoadingDialog({ taskId: data.task.id });
        } catch (e) {
            showSnackbar(e.message);
        }
    }, []);

    const showImportDialog = useCallback(() => {
        showImportFormDialog(async url => {
            await importFormMutation(url);
        });
    }, []);

    return {
        importFormMutation,
        showImportDialog
    };
};

export default useImportForm;
