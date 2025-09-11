import React, { createContext } from "react";
import type { PbDataBinding } from "~/types";

export const BindingContext = createContext<PbDataBinding | undefined>(undefined);

export interface BindingProviderProps {
    binding: PbDataBinding;
    children: React.ReactNode;
}

export const BindingProvider = ({ binding, children }: BindingProviderProps) => {
    return <BindingContext.Provider value={binding}>{children}</BindingContext.Provider>;
};
