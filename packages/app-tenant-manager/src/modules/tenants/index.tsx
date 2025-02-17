import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { AddMenu, AddRoute, Layout } from "@webiny/app-admin";
import { ReactComponent as TenantIcon } from "~/assets/business_black_24dp.svg";
import TenantDataList from "./TenantDataList.js";
import TenantForm from "./TenantForm.js";
import { Plugins } from "@webiny/app-admin";
import { IsRootTenant } from "~/components/IsRootTenant.js";

export const TenantsView = () => {
    return (
        <SplitView>
            <LeftPanel>
                <TenantDataList />
            </LeftPanel>
            <RightPanel>
                <TenantForm />
            </RightPanel>
        </SplitView>
    );
};

export const TenantsModule = () => {
    return (
        <Plugins>
            <IsRootTenant>
                <AddMenu name="tenantManager" label={`Tenant Manager`} icon={<TenantIcon />}>
                    <AddMenu name={"tenantManager.tenants"} label={`Tenants`} path="/tenants" />
                </AddMenu>
                <AddRoute exact path={"/tenants"}>
                    <Layout title={"Tenant Manager - Tenants"}>
                        <TenantsView />
                    </Layout>
                </AddRoute>
            </IsRootTenant>
        </Plugins>
    );
};
