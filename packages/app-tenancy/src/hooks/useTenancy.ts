import { useContext } from "react";
import type { TenancyContextValue } from "~/contexts/Tenancy";
import { TenancyContext } from "~/contexts/Tenancy";

export function useTenancy() {
    return useContext<TenancyContextValue>(TenancyContext);
}
