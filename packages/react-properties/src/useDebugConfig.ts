import { useEffect } from "react";
import { type Property } from "./Properties.js";
import { toObject } from "./utils.js";

declare global {
    interface Window {
        __debugConfigs: Record<string, () => void>;
    }
}

export function useDebugConfig(name: string, properties: Property[]) {
    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            return;
        }

        const configs = window.__debugConfigs ?? {};
        configs[name] = () => console.log(toObject(properties));
        window.__debugConfigs = configs;

        return () => {
            const configs = window.__debugConfigs ?? {};
            delete configs[name];
            window.__debugConfigs = configs;
        };
    }, [properties]);
}
