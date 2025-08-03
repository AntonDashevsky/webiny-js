import React from "react";
import { AdminConfig } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { ReactComponent as PagesIcon } from "@webiny/icons/table_chart.svg";
import { PageEditor } from "~/modules/pages/PageEditor.js";
import { PageList } from "~/modules/pages/PageList.js";
import { WB_PAGE_EDITOR_ROUTE, WB_PAGES_LIST_ROUTE, WB_REDIRECT_LIST_ROUTE } from "~/constants.js";
import { useSettingsDialog } from "~/modules/settings/useSettingsDialog";
import { useIntegrationsDialog } from "./modules/integrations/useIntegrationsDialog.js";
import { PagesListConfig } from "~/modules/pages/PagesListConfig";
import { RedirectsList } from "~/modules/redirects/RedirectsList";
import { RedirectsListConfig } from "~/modules/redirects/RedirectsListConfig";

const { Menu, Route } = AdminConfig;

export const Extension = () => {
    return (
        <>
            <AdminConfig>
                <HasPermission any={["wb.page", "wb.redirect"]}>
                    <Menu
                        name="wb"
                        element={
                            <Menu.Item
                                text={"Website Builder"}
                                icon={
                                    <Menu.Link.Icon
                                        label={"Website Builder"}
                                        element={<PagesIcon />}
                                    />
                                }
                            />
                        }
                    />
                </HasPermission>

                <HasPermission any={["wb.page"]}>
                    <Menu
                        name="wb.pagesLabel"
                        parent="Wb"
                        element={<Menu.Group text={"Pages"} />}
                    />
                </HasPermission>

                <HasPermission name={"wb.page"}>
                    <Route name="wb.pages.list" path={WB_PAGES_LIST_ROUTE} element={<PageList />} />
                    <Route
                        name="wb.pages.editor"
                        path={`${WB_PAGE_EDITOR_ROUTE}/:id`}
                        element={<PageEditor />}
                    />
                    <Menu
                        name="wb.pages"
                        parent={"wb"}
                        element={<Menu.Link text={"Pages"} to={WB_PAGES_LIST_ROUTE} />}
                    />
                </HasPermission>
                <HasPermission name={"wb.redirect"}>
                    <Route
                        name="wb.redirect.list"
                        path={WB_REDIRECT_LIST_ROUTE}
                        element={<RedirectsList />}
                    />
                    <Menu
                        name="wb.redirects"
                        parent={"wb"}
                        element={<Menu.Link text={"Redirects"} to={WB_REDIRECT_LIST_ROUTE} />}
                    />
                </HasPermission>
                <HasPermission name={"wb.settings"}>
                    <Menu name="wb.settings" parent="wb" element={<SettingsMenuItem />} />
                </HasPermission>
                <Menu name="wb.integrations" parent="wb" element={<IntegrationsMenuItem />} />
            </AdminConfig>
            <PagesListConfig />
            <RedirectsListConfig />
        </>
    );
};

const SettingsMenuItem = () => {
    const { showSettingsDialog } = useSettingsDialog();
    return <Menu.Item text={"Settings"} onClick={showSettingsDialog} />;
};

const IntegrationsMenuItem = () => {
    const { showIntegrationsDialog } = useIntegrationsDialog();
    return <Menu.Item text={"Integrations"} onClick={showIntegrationsDialog} />;
};
