import React, { useMemo, useCallback, useState } from "react";
import { plugins } from "@webiny/plugins";
import { TenantHeaderLinkPlugin } from "@webiny/app/plugins/TenantHeaderLinkPlugin.js";
import { useContainer, useWcp } from "@webiny/app-admin";
import { useLocalStorage } from "@webiny/app/presentation/localStorage/useLocalStorage.js";
import {
    LocalStorageFeature,
    LocalStorageService
} from "@webiny/app/features/localStorage/index.js";
import { DiContainerProvider } from "@webiny/app/di/DiContainerProvider.js";

export interface Tenant {
    id: string;
    name: string;
}

export interface TenancyContextValue {
    tenant: string | null;
    setTenant(tenant: string | null): void;
    isMultiTenant: boolean;
}

interface TenancyProviderProps {
    children: React.ReactNode;
}

export const TenancyContext = React.createContext<TenancyContextValue>({
    tenant: null,
    setTenant: () => {
        return void 0;
    },
    isMultiTenant: false
});

const LOCAL_STORAGE_KEY = "tenantId";

const getInitialTenant = (localStorage: LocalStorageService.Interface): string | null => {
    // Check if `tenantId` query parameter is set. If it is, it takes precedence over any other source.
    const searchParams = new URLSearchParams(location.search);
    const tenantId = searchParams.get("tenantId");
    if (tenantId) {
        localStorage.set(LOCAL_STORAGE_KEY, tenantId);
    }

    const currentTenant = localStorage.get(LOCAL_STORAGE_KEY) || "root";
    localStorage.set(LOCAL_STORAGE_KEY, currentTenant);
    plugins.register(new TenantHeaderLinkPlugin(currentTenant));
    return currentTenant;
};

const goToDashboard = () => {
    const url = new URL(window.location.toString());
    url.search = "";
    url.pathname = "/";
    window.location.href = url.toString();
};

export const TenancyProvider = (props: TenancyProviderProps) => {
    const container = useContainer();
    const localStorage = useLocalStorage();
    const [currentTenant, setTenant] = useState(() => getInitialTenant(localStorage));
    const wcp = useWcp();

    const tenantContainer = useMemo(() => {
        // Get current service config
        const { localStorageConfig } = LocalStorageFeature.resolve(container);

        // Create tenant-specific container, and register LocalStorage service with a new prefix.
        const tenantContainer = container.createChildContainer();

        LocalStorageFeature.register(tenantContainer, {
            prefix: `${localStorageConfig.prefix}/${currentTenant}`
        });

        return tenantContainer;
    }, [currentTenant]);

    const changeTenant = useCallback(
        (tenant: string): void => {
            if (!tenant) {
                localStorage.remove(LOCAL_STORAGE_KEY);

                goToDashboard();
            }

            if (!currentTenant) {
                plugins.register(new TenantHeaderLinkPlugin(tenant));
                setTenant(tenant);
                localStorage.set(LOCAL_STORAGE_KEY, tenant);
                return;
            }

            localStorage.set(LOCAL_STORAGE_KEY, tenant);
            goToDashboard();
        },
        [currentTenant]
    );

    const value = useMemo<TenancyContextValue>(
        () => ({
            tenant: currentTenant,
            setTenant: changeTenant,
            isMultiTenant: wcp.canUseFeature("multiTenancy")
        }),
        [currentTenant]
    );

    return (
        <TenancyContext.Provider value={value}>
            <DiContainerProvider container={tenantContainer}>{props.children}</DiContainerProvider>
        </TenancyContext.Provider>
    );
};
