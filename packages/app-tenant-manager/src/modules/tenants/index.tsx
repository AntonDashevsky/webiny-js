import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { AddRoute, Layout } from "@webiny/app-admin";
import TenantDataList from "./TenantDataList";
import TenantForm from "./TenantForm";
import { Plugins } from "@webiny/app-admin";
import { IsRootTenant } from "~/components/IsRootTenant";
import { AdminConfig } from "@webiny/app-admin";
import { ReactComponent as TenantManagerIcon } from "@material-design-icons/svg/outlined/domain.svg";

const { Menu } = AdminConfig;

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
                <Menu
                    name={"tenantManager"}
                    element={<Menu.Item icon={<TenantManagerIcon/>} label={"Tenant Manager"} path={"/tenants"} />}
                />

                <AddRoute exact path={"/tenants"}>
                    <Layout title={"Tenant Manager - Tenants"}>
                        <TenantsView />
                    </Layout>
                </AddRoute>
            </IsRootTenant>
        </Plugins>
    );
};
