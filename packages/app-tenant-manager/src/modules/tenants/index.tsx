import React from "react";
import {
    AdminConfig,
    AdminLayout,
    SplitView,
    LeftPanel,
    RightPanel,
    useRouter
} from "@webiny/app-admin";
import { ReactComponent as TenantManagerIcon } from "@webiny/icons/domain.svg";
import TenantDataList from "./TenantDataList.js";
import TenantForm from "./TenantForm.js";
import { IsRootTenant } from "~/components/IsRootTenant.js";
import { Routes } from "~/routes.js";

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
                        <AdminLayout title={"Tenant Manager - Tenants"}>
                            <TenantsView />
                        </AdminLayout>
                    }
                />
            </IsRootTenant>
        </AdminConfig>
    );
};
