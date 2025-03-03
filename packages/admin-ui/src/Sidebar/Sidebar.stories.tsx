import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import React from "react";
import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as CmsIcon } from "@material-design-icons/svg/outlined/web.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as ApwIcon } from "@material-design-icons/svg/outlined/account_tree.svg";
import { ReactComponent as TenantManagerIcon } from "@material-design-icons/svg/outlined/domain.svg";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as ArticleIcon } from "@material-design-icons/svg/outlined/article.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ChatIcon } from "@material-design-icons/svg/outlined/chat.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/gite.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as MoreVertIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/insert_drive_file.svg";

import wbyLogo from "./stories/wby-logo.png";
import { SidebarProvider } from "~/Sidebar/components/SidebarProvider";
import { DropdownMenu } from "~/DropdownMenu";
import { Tag } from "~/Tag";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    argTypes: {},
    render: args => (
        <>
            <SidebarProvider>
                <Sidebar {...args} />
                <main className={"wby-bg-white wby-p-8"}>Main content goes here.</main>
            </SidebarProvider>
        </>
    )
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    args: {
        title: "Webiny",
        icon: <Sidebar.Icon element={<img src={wbyLogo} alt={"Webiny"} />} />,
        children: (
            <>
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Audit Logs" element={<AuditLogsIcon />} />}
                    content={"Audit Logs"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Form Builder" element={<FormBuilderIcon />} />}
                    content={"Form Builder"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="File Manager" element={<FileManagerIcon />} />}
                    content={"File Manager"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Headless CMS" element={<CmsIcon />} />}
                    content={"Headless CMS"}
                >
                    <Sidebar.Item content={"Content Models"} variant={"group-label"} />
                    <Sidebar.Item content={"Groups"} />
                    <Sidebar.Item content={"Models"} />
                </Sidebar.Item>
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Page Builder" element={<PageBuilderIcon />} />}
                    content={"Page Builder"}
                >
                    <Sidebar.Item content={"Blocks"} variant={"group-label"} />
                    <Sidebar.Item content={"Blocks"} />
                    <Sidebar.Item content={"Categories (active)"} active={true} />
                    <Sidebar.Item content={"Pages"} variant={"group-label"} />
                    <Sidebar.Item content={"Categories"} />
                    <Sidebar.Item content={"Menus"} />
                    <Sidebar.Item content={"Pages"} />
                    <Sidebar.Item content={"Templates"} disabled={true} />
                </Sidebar.Item>
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Publishing Workflows" element={<ApwIcon />} />}
                    content={"Publishing Workflows"}
                >
                    <Sidebar.Item
                        content={"Content Reviews"}
                        icon={
                            <Sidebar.Item.Icon
                                element={<ArticleIcon />}
                                label={"Content Reviews"}
                            />
                        }
                    />
                    <Sidebar.Item
                        content={"Workflows"}
                        icon={<Sidebar.Item.Icon element={<ArticleIcon />} label={"Workflows"} />}
                    />
                </Sidebar.Item>
                <Sidebar.Item
                    disabled={true}
                    icon={
                        <Sidebar.Item.Icon label="Tenant manager" element={<TenantManagerIcon />} />
                    }
                    content={"Tenant manager"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Settings" element={<SettingsIcon />} />}
                    content={"Settings (active)"}
                    active={true}
                />
            </>
        ),
        footer: (
            <Sidebar.Item
                icon={<Sidebar.Item.Icon label="Settings" element={<InfoIcon />} />}
                content={"Support"}
                action={
                    <Sidebar.Item.Action
                        element={
                            <DropdownMenu trigger={<MoreVertIcon />} className={"wby-w-[225px]"}>
                                <DropdownMenu.Item
                                    disabled={true}
                                    content={
                                        <>
                                            Webiny 5.43.0 <Tag variant={"accent"} content={"WCP "} />
                                        </>
                                    }
                                />
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item
                                    content={"API Playground"}
                                    icon={<ApiPlaygroundIcon />}
                                />
                                <DropdownMenu.Item content={"Documentation"} icon={<DocsIcon />} />
                                <DropdownMenu.Item content={"GitHub"} icon={<GithubIcon />} />
                                <DropdownMenu.Item content={"Slack"} icon={<ChatIcon />} />
                            </DropdownMenu>
                        }
                    />
                }
            />
        )
    }
};
