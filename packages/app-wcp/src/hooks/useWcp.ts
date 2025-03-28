import { useContext } from "react";
import { WcpContext } from "~/contexts/index.js";

export function useWcp() {
    const context = useContext(WcpContext);

    if (!context) {
        throw Error(`Missing WcpProvider in the component hierarchy!`);
    }

    return context;
}
