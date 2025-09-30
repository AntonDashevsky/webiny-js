import React, { memo } from "react";
import { Menus } from "./Base/Menus.js";
import { RoutesConfig } from "./Base/RoutesConfig.js";
import { Tenant } from "./Base/Tenant.js";
import { AdminConfigProvider } from "~/config/AdminConfig.js";

const BaseExtension = () => {
    return (
        <>
            <AdminConfigProvider />
            <Tenant />
            <Menus />
            <RoutesConfig />
        </>
    );
};

export const Base = memo(BaseExtension);
