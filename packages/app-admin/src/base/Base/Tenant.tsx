import React from "react";
import { AdminConfig } from "~/config/AdminConfig.js";
import wbyLogo from "./Tenant/wby-logo.svg";

console.log("wbyLogo", wbyLogo);

export const Tenant = React.memo(() => {
    const { Tenant } = AdminConfig;
    return (
        <AdminConfig.Public>
            <Tenant>
                <Tenant.Name value={"Webiny"} />
                <Tenant.Logo element={<img src={wbyLogo} alt={"Webiny"} />} />
            </Tenant>
        </AdminConfig.Public>
    );
});

Tenant.displayName = "Tenant";
