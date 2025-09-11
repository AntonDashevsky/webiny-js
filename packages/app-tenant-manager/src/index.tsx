import { TenantSelector as BaseTenantSelector, Plugins, useWcp } from "@webiny/app-admin";
import React, { Fragment, memo } from "react";
import { AddTenantFormField } from "./components/AddTenantFormField.js";
import { CurrentTenant } from "./components/CurrentTenant.js";
import { DomainsModule } from "./modules/domains/index.js";
import { TenantsModule } from "./modules/tenants/index.js";
import { AdminConfig } from "@webiny/app-admin";
import { useSecurity } from "@webiny/app-security";

const { Tenant } = AdminConfig;

const TenantSelector = BaseTenantSelector.createDecorator(() => {
    return function TenantSelector() {
        return <CurrentTenant />;
    };
});

const TenantNameLogoBase = () => {
    const { identity } = useSecurity();
    if (!identity) {
        return null;
    }

    const { currentTenant } = identity;
    if (currentTenant.id === "root") {
        return null;
    }

    const { image, name } = currentTenant;
    return (
        <AdminConfig.Public>
            <Tenant>
                {image && <Tenant.Logo element={<img src={currentTenant.image.src} />} />}
                <Tenant.Name value={name} />
            </Tenant>
        </AdminConfig.Public>
    );
};

const TenantNameLogo = () => {
    return (
        <Plugins>
            <TenantNameLogoBase />
        </Plugins>
    );
};
const TenantManagerExtension = () => {
    const wcp = useWcp();
    if (!wcp.canUseFeature("multiTenancy")) {
        return null;
    }

    return (
        <Fragment>
            <TenantNameLogo />
            <TenantSelector />
            <TenantsModule />
            <DomainsModule />
        </Fragment>
    );
};

export const TenantManager: React.ComponentType = memo(TenantManagerExtension);

export { useCurrentTenant } from "./hooks/useCurrentTenant.js";
export { IsRootTenant, IsNotRootTenant, IsTenant } from "./components/IsRootTenant.js";
export { AddTenantFormField };
