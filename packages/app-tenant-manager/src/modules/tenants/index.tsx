import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { Layout } from "@webiny/app-admin";
import TenantDataList from "./TenantDataList.js";
import TenantForm from "./TenantForm.js";
import { IsRootTenant } from "~/components/IsRootTenant.js";
import { ReactComponent as TenantManagerIcon } from "@webiny/icons/domain.svg";
import { AdminConfig } from "@webiny/app-admin";
import { Routes } from "~/routes.js";
import { useRouter } from "@webiny/app/router.js";

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
    const router = useRouter();

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
                            to={router.getLink(Routes.Tenants.List)}
                        />
                    }
                />

                <Route
                    route={Routes.Tenants.List}
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
