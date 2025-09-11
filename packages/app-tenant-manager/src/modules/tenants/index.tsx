import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { Layout } from "@webiny/app-admin";
import TenantDataList from "./TenantDataList.js";
import TenantForm from "./TenantForm.js";
import { IsRootTenant } from "~/components/IsRootTenant.js";
import { ReactComponent as TenantManagerIcon } from "@webiny/icons/domain.svg";
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
                        <Menu.Link
                            icon={
                                <Menu.Link.Icon
                                    element={<TenantManagerIcon />}
                                    label={"Tenant Manager"}
                                />
                            }
                            text={"Tenant Manager"}
                            to={"/tenants"}
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
