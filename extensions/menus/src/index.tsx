import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";

const { Menu } = AdminConfig;

export const Extension = () => {
    return (
        <>
            <AdminConfig>
                <Menu name={"menu"} label={"Menu"} elements={<>Menu</>} />
            </AdminConfig>
        </>
    );
};
