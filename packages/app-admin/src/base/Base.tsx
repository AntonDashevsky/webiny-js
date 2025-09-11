import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { uiLayoutPlugin } from "~/plugins/uiLayoutRenderer/index.js";
import { Menus } from "./Base/Menus.js";
import { Routes } from "./Base/Routes.js";
import { Tenant } from "./Base/Tenant.js";
import { AdminConfigProvider } from "~/config/AdminConfig.js";

const BaseExtension = () => {
    plugins.register([uiLayoutPlugin]);

    return (
        <>
            <AdminConfigProvider />
            <Tenant />
            <Menus />
            <Routes />
        </>
    );
};

export const Base = memo(BaseExtension);
