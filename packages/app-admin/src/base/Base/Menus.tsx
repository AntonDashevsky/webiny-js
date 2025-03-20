import React from "react";
import { HasPermission } from "@webiny/app-security";
import { FileManager } from "~/base/ui/FileManager";
import { WebinyVersion } from "./Menus/WebinyVersion";
import { SupportMenuItems } from "./Menus/SupportMenuItems";
import { AdminConfig } from "~/config/AdminConfig";
import { ReactComponent as DashboardIcon } from "@material-design-icons/svg/outlined/space_dashboard.svg";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/folder_open.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as SlackIcon } from "@material-design-icons/svg/outlined/numbers.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/route.svg";
import { ReactComponent as MoreIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { DropdownMenu } from "@webiny/admin-ui";

const { Menu } = AdminConfig;

export const Menus = React.memo(() => {
    return (
        <AdminConfig>
            <HasPermission name={"fm.file"}>
                <Menu
                    name={"fm"}
                    element={
                        <FileManager>
                            {({ showFileManager }) => (
                                <Menu.Item
                                    label={"File Manager"}
                                    icon={<FileManagerIcon />}
                                    onClick={showFileManager}
                                    data-testid={"admin-drawer-footer-menu-file-manager"}
                                />
                            )}
                        </FileManager>
                    }
                />
            </HasPermission>
            <Menu
                name={"home"}
                pin={"start"}
                element={<Menu.Link label={"Home"} icon={<DashboardIcon />} path={"/"} />}
            />
            <Menu
                name={"settings"}
                pin={"end"}
                element={
                    <Menu.Link
                        label={"Settings"}
                        icon={<SettingsIcon />}
                        path={"/access-management/roles"}
                    />
                }
            />

            <Menu.Support
                name={"api-playground"}
                element={
                    <Menu.Support.Link
                        label={"API Playground"}
                        icon={<ApiPlaygroundIcon />}
                        to={"/api-playground"}
                    />
                }
            />

            <Menu.Support
                name={"docs"}
                element={
                    <Menu.Support.Link
                        label={"Documentation"}
                        icon={<DocsIcon />}
                        to={"https://www.webiny.com/docs"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    />
                }
            />

            <Menu.Support
                name={"github"}
                element={
                    <Menu.Support.Link
                        label={"GitHub"}
                        icon={<GithubIcon />}
                        to={"https://github.com/webiny/webiny-js"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    />
                }
            />

            <Menu.Support
                name={"slack"}
                element={
                    <Menu.Support.Link
                        label={"Slack"}
                        icon={<SlackIcon />}
                        to={"https://www.webiny.com/slack"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    />
                }
            />

            <Menu.Support
                name={"webiny-version"}
                pin={"end"}
                element={
                    <>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item content={<WebinyVersion />} readOnly />
                    </>
                }
            />

            <Menu.Footer
                name={"support"}
                element={
                    <DropdownMenu
                        className={"wby-w-[225px]"}
                        trigger={
                            <Menu.Item
                                icon={<InfoIcon />}
                                label={"Support"}
                                action={<Menu.Item.Action element={<MoreIcon />} />}
                            />
                        }
                    >
                        <SupportMenuItems />
                    </DropdownMenu>
                }
            />
        </AdminConfig>
    );
});

Menus.displayName = "Menus";
