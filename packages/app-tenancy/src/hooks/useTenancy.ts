import { useContext } from "react";
import type { TenancyContextValue } from "~/contexts/Tenancy.js";
import { TenancyContext } from "~/contexts/Tenancy.js";

export function useTenancy() {
    return useContext<TenancyContextValue>(TenancyContext);
}
