import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter, Route, Routes, useLocation } from "@webiny/react-router";
import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as CmsIcon } from "@material-design-icons/svg/outlined/web.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ChatIcon } from "@material-design-icons/svg/outlined/chat.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/gite.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as MoreVertIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/insert_drive_file.svg";

import wbyLogo from "./stories/wby-logo.png";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "~/Sidebar/components/SidebarProvider";
import { DropdownMenu } from "~/DropdownMenu";
import { Tag } from "~/Tag";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    render: () => (
        <BrowserRouter>
            <Routes>
                <Route path={"*"} element={<SidebarComponent />} />
            </Routes>
        </BrowserRouter>
    )
};

const SidebarComponent = () => {
    const { hash } = useLocation();

    console.log('heš', hash);
    return (
        <SidebarProvider>
            <Sidebar
                title={"Webiny"}
                icon={<Sidebar.Icon element={<img src={wbyLogo} alt={"Webiny"} />} />}
                footer={
                    <Sidebar.Item
                        icon={<Sidebar.Item.Icon label="Settings" element={<InfoIcon />} />}
                        text={"Support"}
                        action={
                            <Sidebar.Item.Action
                                element={
                                    <DropdownMenu
                                        trigger={<MoreVertIcon />}
                                        className={"wby-w-[225px]"}
                                    >
                                        <DropdownMenu.Item
                                            disabled={true}
                                            content={
                                                <>
                                                    Webiny 5.43.0{" "}
                                                    <Tag variant={"neutral-light"} content={"WCP"} />
                                                </>
                                            }
                                        />
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item icon={<ApiPlaygroundIcon />}>
                                            API Playground
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item icon={<DocsIcon />}>
                                            Documentation
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item icon={<GithubIcon />}>
                                            GitHub
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item icon={<ChatIcon />}>
                                            Slack
                                        </DropdownMenu.Item>
                                    </DropdownMenu>
                                }
                            />
                        }
                    />
                }
            >
                <Sidebar.Item
                    text={"Audit Logs"}
                    to={"#audit-logs"}
                    active={hash === "#audit-logs"}
                    icon={<Sidebar.Item.Icon label="Audit Logs" element={<AuditLogsIcon />} />}
                />
                <Sidebar.Link
                    text={"Form Builder"}
                    to={"#form-builder"}
                    active={hash === "#form-builder"}
                    icon={<Sidebar.Item.Icon label="Form Builder" element={<FormBuilderIcon />} />}
                />
                <Sidebar.Item
                    text={"File Manager"}
                    onClick={() => {
                        alert("File Manager clicked");
                    }}
                    icon={<Sidebar.Item.Icon label="File Manager" element={<FileManagerIcon />} />}
                />
                <Sidebar.Item
                    text={"Headless CMS"}
                    to={"#cms"}
                    active={hash === "#cms"}
                    icon={<Sidebar.Item.Icon label="Headless CMS" element={<CmsIcon />} />}
                >
                    <Sidebar.Item text={"Content Models"} variant={"group-label"} />
                    <Sidebar.Item
                        text={"Groups"}
                        to={"#cms-groups"}
                        active={hash === "#cms-groups"}
                    />
                    <Sidebar.Item
                        text={"Models"}
                        to={"#cms-models"}
                        active={hash === "#cms-models"}
                    />
                </Sidebar.Item>
                <Sidebar.Item
                    text={"Page Builder"}
                    to={"#page-builder"}
                    active={hash === "#page-builder"}
                    icon={<Sidebar.Item.Icon label="Page Builder" element={<PageBuilderIcon />} />}
                >
                    <Sidebar.Item text={"Blocks"} variant={"group-label"} />
                    <Sidebar.Item
                        text={"Blocks"}
                        to={"#pb-blocks"}
                        active={hash === "#pb-blocks"}
                    />
                    <Sidebar.Item
                        text={"Categories"}
                        to={"#pb-blocks-categories"}
                        active={hash === "#pb-blocks-categories"}
                    />
                </Sidebar.Item>
            </Sidebar>
        </SidebarProvider>
    );
};
