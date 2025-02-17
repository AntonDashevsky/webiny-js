import React, { useCallback, useEffect, useState } from "react";
import get from "lodash/get.js";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { i18n } from "@webiny/app/i18n/index.js";
import { useDialog } from "@webiny/app-admin/hooks/useDialog.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import ImportFormsDetails from "./useImportFormsDetails.js";
import ProgressBar from "./ProgressBar.js";
import { LoadingDialog } from "./styledComponents.js";
import { GET_FORM_IMPORT_EXPORT_TASK, LIST_FORM_IMPORT_EXPORT_SUB_TASKS } from "~/admin/graphql.js";
import { ImportExportTaskStatus } from "~/types.js";

const t = i18n.ns("app-form-builder/admin/plugins/editor/defaultBar/importForm");

const importFormDialogTitle = t`Import forms`;

const completionMessage = t`All forms have been imported`;
const errorMessage = t`Failed to import forms`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Importing forms`;

const INTERVAL = 0.5 * 1000;

const MESSAGES: Record<string, string> = {
    [ImportExportTaskStatus.COMPLETED]: completionMessage,
    [ImportExportTaskStatus.PROCESSING]: processingMessage,
    [ImportExportTaskStatus.PENDING]: pendingMessage
};

interface ImportFormLoadingDialogContentProps {
    taskId: string;
}

interface FormImportExportData {
    [key: string]: any;
}

const ImportFormLoadingDialogContent = ({ taskId }: ImportFormLoadingDialogContentProps) => {
    const { showSnackbar } = useSnackbar();
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const { data } = useQuery(GET_FORM_IMPORT_EXPORT_TASK, {
        variables: {
            id: taskId
        },
        skip: taskId === null,
        fetchPolicy: "network-only",
        pollInterval: completed ? 0 : INTERVAL,
        notifyOnNetworkStatusChange: true
    });

    const [getSubTasks, getSubTasksQuery] = useLazyQuery(LIST_FORM_IMPORT_EXPORT_SUB_TASKS, {
        variables: {
            id: taskId,
            status: "completed"
        }
    });

    const pollExportFormTaskStatus = useCallback((response: FormImportExportData) => {
        const { error, data } = get(response, "pageBuilder.getImportExportTask", {});
        if (error) {
            return showSnackbar(error.message);
        }

        // Handler failed task
        if (data && data.status === "failed") {
            setCompleted(true);
            showSnackbar("Error: Failed to import forms");
            // TODO: @ashutosh show an informative dialog about error.
            setError(data.error);
        }

        if (data && data.status === "completed") {
            setCompleted(true);
            getSubTasks();
        }
    }, []);

    // This component will remain as long as we stick to `/form-builder/forms` route.
    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportFormTaskStatus(data);
    }, [data]);

    const { status, stats } = get(data, "pageBuilder.getImportExportTask.data", {
        status: "pending",
        stats: null
    });

    return (
        <LoadingDialog.Wrapper>
            <LoadingDialog.WrapperLeft>
                <LoadingDialog.UploadIllustration />
            </LoadingDialog.WrapperLeft>
            <LoadingDialog.WrapperRight>
                {error ? (
                    <LoadingDialog.TitleContainer>
                        <LoadingDialog.CancelIcon />
                        <Typography use={"subtitle1"}>{errorMessage}</Typography>
                    </LoadingDialog.TitleContainer>
                ) : status === "completed" ? (
                    <LoadingDialog.TitleContainer>
                        <LoadingDialog.CheckMarkIcon />
                        <Typography use={"subtitle1"}>{MESSAGES[status]}</Typography>
                    </LoadingDialog.TitleContainer>
                ) : (
                    <LoadingDialog.TitleContainer>
                        <LoadingDialog.Pulse>
                            <div className="inner" />
                        </LoadingDialog.Pulse>
                        <Typography use={"subtitle1"}>{MESSAGES[status]}</Typography>
                    </LoadingDialog.TitleContainer>
                )}

                <LoadingDialog.StatsContainer>
                    {error && (
                        <LoadingDialog.StatusContainer>
                            <LoadingDialog.StatusTitle use={"body2"}>
                                {t`Error`}
                            </LoadingDialog.StatusTitle>
                            <LoadingDialog.StatusBody use={"body2"}>
                                {error.message}
                            </LoadingDialog.StatusBody>
                        </LoadingDialog.StatusContainer>
                    )}
                    {stats && (
                        <LoadingDialog.ProgressContainer>
                            <LoadingDialog.StatusTitle use={"body2"}>
                                {t`{completed} of {total} completed`({
                                    completed: `${stats.completed}`,
                                    total: `${stats.total}`
                                })}
                            </LoadingDialog.StatusTitle>
                            <ProgressBar
                                value={stats.completed}
                                max={stats.total}
                                color={"var(--mdc-theme-secondary)"}
                                width={"100%"}
                            />
                        </LoadingDialog.ProgressContainer>
                    )}
                </LoadingDialog.StatsContainer>
                <ImportFormsDetails
                    loading={getSubTasksQuery.loading}
                    result={getSubTasksQuery.data}
                />
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

interface UseImportFormLoadingDialogCallableResponse {
    showImportFormLoadingDialog: (props: ImportFormLoadingDialogContentProps) => void;
}
const useImportFormLoadingDialog = (): UseImportFormLoadingDialogCallableResponse => {
    const { showDialog } = useDialog();

    return {
        showImportFormLoadingDialog: props => {
            showDialog(<ImportFormLoadingDialogContent {...props} />, {
                title: importFormDialogTitle,
                actions: {
                    accept: { label: t`Continue`, onClick: () => window.location.reload() }
                },
                dataTestId: "import-forms.loading-dialog"
            });
        }
    };
};

export default useImportFormLoadingDialog;
