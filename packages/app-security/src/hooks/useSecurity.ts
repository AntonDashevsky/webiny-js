import { useContext } from "react";
import { SecurityContext } from "~/contexts/Security.js";

export function useSecurity() {
    const context = useContext(SecurityContext);

    if (!context) {
        throw Error(`Missing <SecurityProvider> in the component hierarchy!`);
    }

    return context;
}
