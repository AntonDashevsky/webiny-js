import { LocalStorageFeature, LocalStorageService } from "~/features/localStorage";
import { useContainer } from "~/index.js";

/**
 * Returns the LocalStorageService instance from DI.
 * Useful when you want to call service methods imperatively inside components.
 */
export function useLocalStorage(): LocalStorageService.Interface {
    const container = useContainer();
    const { localStorageService } = LocalStorageFeature.resolve(container);

    return {
        get: localStorageService.get.bind(localStorageService),
        set: localStorageService.set.bind(localStorageService),
        remove: localStorageService.remove.bind(localStorageService),
        clear: localStorageService.clear.bind(localStorageService),
        keys: localStorageService.keys.bind(localStorageService),
    };
}
