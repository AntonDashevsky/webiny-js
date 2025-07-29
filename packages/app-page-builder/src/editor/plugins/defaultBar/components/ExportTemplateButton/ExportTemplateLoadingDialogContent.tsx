import React, { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useQuery } from "@apollo/react-hooks";
import type { GetTemplateImportExportTaskResponse } from "~/admin/graphql/templateImportExport.gql";
import { GET_TEMPLATE_IMPORT_EXPORT_TASK } from "~/admin/graphql/templateImportExport.gql";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as SuccessIcon } from "@webiny/icons/check_circle_outline.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import { i18n } from "@webiny/app/i18n";
import { LoadingDialog } from "../ImportButton/styledComponents";
import ProgressBar from "../ImportButton/ProgressBar";
import useExportTemplateDialog from "./useExportTemplateDialog";
import { ImportExportTaskStatus } from "~/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importTemplate");

const completionMessage = t`All templates have been exported`;
const errorMessage = t`Failed to import templates`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Exporting templates`;

const INTERVAL = 0.5 * 1000;

const MESSAGES: Record<string, string> = {
    [ImportExportTaskStatus.COMPLETED]: completionMessage,
    [ImportExportTaskStatus.PROCESSING]: processingMessage,
    [ImportExportTaskStatus.PENDING]: pendingMessage
};

interface ExportTemplateLoadingDialogContent {
    taskId: string;
}

const ExportTemplateLoadingDialogContent = ({ taskId }: ExportTemplateLoadingDialogContent) => {
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, string> | null>(null);
    const { showSnackbar } = useSnackbar();
    const { showExportTemplateContentDialog } = useExportTemplateDialog();

    const { data } = useQuery<GetTemplateImportExportTaskResponse>(
        GET_TEMPLATE_IMPORT_EXPORT_TASK,
        {
            variables: {
                id: taskId
            },
            skip: taskId === null,
            fetchPolicy: "network-only",
            pollInterval: completed ? 0 : INTERVAL,
            notifyOnNetworkStatusChange: true
        }
    );

    const pollExportTemplateTaskStatus = useCallback(
        (response: GetTemplateImportExportTaskResponse) => {
            const { error, data } = response.pageBuilder.getImportExportTask || {};
            if (error) {
                showSnackbar(error.message);
                return;
            }

            // Handler failed task
            if (data && data.status === "failed") {
                setCompleted(true);
                showSnackbar("Error: Failed to export templates!");
                setError(data.error);
            }

            if (data && data.status === "completed") {
                setCompleted(true);
                // getSubTasks();
                showExportTemplateContentDialog({ exportUrl: data.data.url });
            }
        },
        []
    );

    // This component will remain as long as we stick to `/page-builder/templates` route.
    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportTemplateTaskStatus(data);
    }, [data]);

    const { status, stats } = data?.pageBuilder.getImportExportTask.data || {
        status: ImportExportTaskStatus.PENDING,
        stats: null
    };

    return (
        <LoadingDialog.Wrapper>
            <LoadingDialog.WrapperLeft>
                <LoadingDialog.ExportIllustration />
            </LoadingDialog.WrapperLeft>
            <LoadingDialog.WrapperRight>
                {error ? (
                    <LoadingDialog.TitleContainer>
                        <Icon
                            icon={<ErrorIcon />}
                            label="Error"
                            size={"md"}
                            className={"wby-fill-danger wby-mr-sm"}
                        />
                        <Text size={"md"}>{errorMessage}</Text>
                    </LoadingDialog.TitleContainer>
                ) : status === ImportExportTaskStatus.COMPLETED ? (
                    <LoadingDialog.TitleContainer>
                        <Icon
                            icon={<SuccessIcon />}
                            label="Success"
                            size={"md"}
                            className={"wby-fill-success wby-mr-sm"}
                        />
                        <Text size={"md"}>{MESSAGES[status]}</Text>
                    </LoadingDialog.TitleContainer>
                ) : (
                    <LoadingDialog.TitleContainer>
                        <LoadingDialog.Pulse>
                            <div className="inner" />
                        </LoadingDialog.Pulse>
                        <Text size={"md"}>{MESSAGES[status]}</Text>
                    </LoadingDialog.TitleContainer>
                )}

                <LoadingDialog.StatsContainer>
                    {error && (
                        <LoadingDialog.StatusContainer>
                            <Text size={"md"}>{t`Error`}</Text>
                            <Text size={"sm"}>{error.message}</Text>
                        </LoadingDialog.StatusContainer>
                    )}
                    {stats && (
                        <LoadingDialog.ProgressContainer>
                            <Text size={"sm"}>
                                {t`{completed} of {total} completed`({
                                    completed: `${stats.completed}`,
                                    total: `${stats.total}`
                                })}
                            </Text>
                            <ProgressBar
                                value={stats.completed}
                                max={stats.total}
                                color={"var(--mdc-theme-secondary)"}
                                width={"100%"}
                            />
                        </LoadingDialog.ProgressContainer>
                    )}
                </LoadingDialog.StatsContainer>
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

export default ExportTemplateLoadingDialogContent;
