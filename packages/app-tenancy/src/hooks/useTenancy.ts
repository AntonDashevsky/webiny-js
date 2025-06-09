import { useContext } from "react";
import { TenancyContext, type TenancyContextValue } from "~/contexts/Tenancy.js";

export function useTenancy() {
    return useContext<TenancyContextValue>(TenancyContext);
}
