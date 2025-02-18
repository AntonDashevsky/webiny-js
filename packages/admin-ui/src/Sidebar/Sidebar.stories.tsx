import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import React from "react";
import { ReactComponent as CreditCard } from "@material-design-icons/svg/outlined/credit_score.svg";
import { ReactComponent as Settings } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as CmsIcon } from "@material-design-icons/svg/outlined/web.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as ApwIcon } from "@material-design-icons/svg/outlined/account_tree.svg";
import { ReactComponent as TenantManagerIcon } from "@material-design-icons/svg/outlined/domain.svg";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import wbyLogo from "./stories/wby-logo.png";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    args: {
        title: "Webiny",
        icon: <Sidebar.Icon element={<img src={wbyLogo} alt={"Webiny"}/>} label={"Webiny"}/>,
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
                    icon={<Sidebar.Item.Icon label="Headless CMS" element={<CmsIcon />} />}
                    content={"Headless CMS"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Page Builder" element={<PageBuilderIcon />} />}
                    content={"Page Builder"}
                >
                    <Sidebar.Item
                        icon={<Sidebar.Item.Icon label="Blocks" element={<CreditCard />} />}
                        content={"Blocks"}
                    >
                        <Sidebar.Item content={"Blocks"} />
                        <Sidebar.Item content={"Categories"} />
                    </Sidebar.Item>
                    <Sidebar.Item
                        icon={<Sidebar.Item.Icon label="Pages" element={<Settings />} />}
                        content={"Pages"}
                    >
                        <Sidebar.Item content={"Categories"} />
                        <Sidebar.Item content={"Menus"} />
                        <Sidebar.Item content={"Pages"} />
                        <Sidebar.Item content={"Templates"} />
                    </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Publishing Workflows" element={<ApwIcon />} />}
                    content={"Publishing Workflows"}
                />
                <Sidebar.Item
                    icon={
                        <Sidebar.Item.Icon label="Tenant manager" element={<TenantManagerIcon />} />
                    }
                    content={"Tenant manager"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Settings" element={<SettingsIcon />} />}
                    content={"Settings"}
                />
            </>
        )
    }
};
