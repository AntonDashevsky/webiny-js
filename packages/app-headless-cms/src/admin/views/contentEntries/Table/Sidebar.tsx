import React from "react";
import styled from "@emotion/styled";
import { FolderTree, useNavigateFolder } from "@webiny/app-aco";
import { SidebarContainer, SidebarContent, SidebarFooter } from "./styled.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { Link } from "@webiny/react-router";
import { useModel } from "~/admin/components/ModelProvider/index.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { css } from "emotion";
import { TrashBin } from "~/admin/components/ContentEntries/TrashBin/components/TrashBin.js";

const t = i18n.ns("app-headless-cms/admin/content-entries/table");

const ModelName = styled.div`
    font-family: var(--mdc-typography-font-family);
    padding: 10px 0;
    font-size: 24px;
`;

const ModelId = styled("span")({
    color: "var(--mdc-theme-text-secondary-on-background)"
});

const disabled = css({
    color: "rgba(0, 0, 0, 0.54)",
    cursor: "default"
});

interface SidebarProps {
    folderId?: string;
}

export const Sidebar = ({ folderId }: SidebarProps) => {
    const { navigateToFolder } = useNavigateFolder();

    const { model } = useModel();

    return (
        <SidebarContainer>
            <SidebarContent>
                <ModelName>
                    {model.name}
                    <br />
                    <Typography use={"subtitle1"}>
                        <ModelId>
                            Model ID:{" "}
                            {model.plugin ? (
                                <Tooltip
                                    content={t`Content model is registered via a plugin.`}
                                    placement={"top"}
                                >
                                    <Link to="#" className={disabled}>
                                        {model.modelId}
                                    </Link>
                                </Tooltip>
                            ) : (
                                <Tooltip content={t`Edit content model`} placement={"top"}>
                                    <Link to={`/cms/content-models/${model.modelId}`}>
                                        {model.modelId}
                                    </Link>
                                </Tooltip>
                            )}
                        </ModelId>
                    </Typography>
                </ModelName>
                <FolderTree
                    focusedFolderId={folderId}
                    onFolderClick={data => navigateToFolder(data.id)}
                    enableActions={true}
                    enableCreate={true}
                />
            </SidebarContent>
            <SidebarFooter>
                <TrashBin />
            </SidebarFooter>
        </SidebarContainer>
    );
};
