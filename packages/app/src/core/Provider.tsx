import { useEffect } from "react";
import { type GenericComponent, type Decorator, useApp } from "~/index.js";

export interface ProviderProps {
    hoc: Decorator<GenericComponent>;
}

/**
 * Register a new React context provider.
 */
export const Provider = ({ hoc }: ProviderProps) => {
    const { addProvider } = useApp();

    useEffect(() => {
        return addProvider(hoc);
    }, []);

    return null;
};
