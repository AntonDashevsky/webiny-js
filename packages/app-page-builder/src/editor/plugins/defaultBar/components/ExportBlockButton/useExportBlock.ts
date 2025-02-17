import { useEffect, useState } from "react";
import get from "lodash/get.js";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useDialog } from "@webiny/app-admin/hooks/useDialog.js";
import { EXPORT_BLOCKS } from "~/admin/graphql/blockImportExport.gql.js";
import useExportBlockDialog from "~/editor/plugins/defaultBar/components/ExportBlockButton/useExportBlockDialog.js";

const useExportBlock = () => {
    const [taskId, setTaskId] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();
    const { showExportBlockLoadingDialog } = useExportBlockDialog();
    const { hideDialog } = useDialog();

    const [exportBlock] = useMutation(EXPORT_BLOCKS, {
        onCompleted: response => {
            const { error, data } = get(response, "pageBuilder.exportBlocks", {});
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
            showExportBlockLoadingDialog(taskId);
        }
    }, [taskId]);

    return {
        exportBlock
    };
};

export default useExportBlock;
