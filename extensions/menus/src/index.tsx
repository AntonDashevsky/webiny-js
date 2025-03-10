import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";

const { Menu } = AdminConfig;

import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as HeadlessCmsIcon } from "@material-design-icons/svg/outlined/wysiwyg.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ChatIcon } from "@material-design-icons/svg/outlined/chat.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/gite.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as MoreVertIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/insert_drive_file.svg";
import { ReactComponent as DashboardIcon } from "@material-design-icons/svg/outlined/space_dashboard.svg";

export const Extension = () => {
    return (
        <>
            {/*<AdminConfig>*/}
            {/* <Menu
                    name={"cms"}
                    element={
                        <Menu.Item
                            label={"Headless CMS"}
                            icon={<HeadlessCmsIcon />}
                            path={"/cms/content-models"}
                        />
                    }
                />

                 💡 Form Builder
                <Menu
                    name={"fb"}
                    element={
                        <Menu.Item
                            label={"Form Builder"}
                            icon={<FormBuilderIcon />}
                            path={"/form-builder/forms"}
                        />
                    }
                />
                 💡 Form Builder > Forms
                <Menu
                    name={"fb.forms"}
                    parent={"fb"}
                    element={<Menu.Item label={"Forms"} path={"/form-builder/forms"} />}
                />
                 💡 Page Builder
                <Menu name={"pb"} element={<Menu.Item label={"Page Builder"} />} />
                 💡 Page Builder > Blocks
                <Menu name={"pb.blocks"} parent="pb" element={<Menu.Item label={"Blocks"} />} />
                <Menu
                    name={"pb.blocks.blocks"}
                    parent="pb.blocks"
                    element={<Menu.Item label={"Blocks"} path={"/page-builder/page-blocks"} />}
                />
                <Menu
                    name={"pb.blocks.categories"}
                    parent="pb.blocks"
                    element={
                        <Menu.Item label={"Categories"} path={"/page-builder/page-categories"} />
                    }
                />
                 💡 Page Builder > Pages
                <Menu name={"pb.pages"} parent="pb" element={<Menu.Item label={"Pages"} />} />
                <Menu
                    name={"pb.pages.categories"}
                    parent="pb.pages"
                    element={<Menu.Item label={"Categories"} path={"/page-builder/categories"} />}
                />
                <Menu
                    name={"pb.pages.menus"}
                    parent="pb.pages"
                    element={<Menu.Item label={"Menus"} path={"/page-builder/menus"} />}
                />
                <Menu
                    name={"pb.pages.pages"}
                    parent="pb.pages"
                    element={<Menu.Item label={"Pages"} path={"/page-builder/pages"} />}
                />
                <Menu
                    name={"pb.templates.templates"}
                    parent="pb.templates"
                    element={<Menu.Item label={"Templates"} path={"/page-builder/templates"} />}
                />*/}
            {/*</AdminConfig>*/}
        </>
    );
};
