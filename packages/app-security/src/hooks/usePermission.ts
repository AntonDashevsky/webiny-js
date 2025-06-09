import { useSecurity } from "~/hooks/useSecurity.js";
import { type SecurityPermission } from "~/types.js";

export function usePermission<T extends SecurityPermission = SecurityPermission>(name: string) {
    const { getPermission } = useSecurity();
    return getPermission<T>(name);
}
