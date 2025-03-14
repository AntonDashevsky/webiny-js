import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { Layout } from "@webiny/app-admin";
import TenantDataList from "./TenantDataList";
import TenantForm from "./TenantForm";
import { IsRootTenant } from "~/components/IsRootTenant";
import { ReactComponent as TenantManagerIcon } from "@material-design-icons/svg/outlined/domain.svg";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

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
        <AdminConfig>
            <IsRootTenant>
                <Menu
                    name={"tenantManager"}
                    element={
                        <Menu.Item
                            icon={<TenantManagerIcon />}
                            label={"Tenant Manager"}
                            path={"/tenants"}
                        />
                    }
                />

                <Route
                    name={"tenantManager.tenants"}
                    exact
                    path={"/tenants"}
                    element={
                        <Layout title={"Tenant Manager - Tenants"}>
                            <TenantsView />
                        </Layout>
                    }
                />
            </IsRootTenant>
        </AdminConfig>
    );
};
