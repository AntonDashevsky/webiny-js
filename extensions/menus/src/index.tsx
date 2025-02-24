import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";

const { Menu } = AdminConfig;

export const Extension = () => {
    return (
        <>
            <AdminConfig>
                {/* 💡 Form Builder */}
                <Menu name={"fb"} element={<Menu.Item label={"Form Builder"} />} />

                {/* 💡 Form Builder > Forms */}
                <Menu
                    name={"fb.forms"}
                    parent={"fb"}
                    element={<Menu.Item label={"Forms"} path={"/form-builder/forms"} />}
                />



                {/* 💡 Page Builder */}
                <Menu name={"pb"} element={<Menu.Item label={"Page Builder"} />} />

                {/* 💡 Page Builder > Blocks */}
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

                {/* 💡 Page Builder > Pages */}
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
                />
            </AdminConfig>
        </>
    );
};
