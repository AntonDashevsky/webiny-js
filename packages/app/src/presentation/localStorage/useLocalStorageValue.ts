import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { LocalStorageFeature } from "~/features/localStorage";
import { useContainer } from "~/di/DiContainerProvider";

export function useLocalStorageValue<T = string>(key: string): T | undefined {
    const container = useContainer();
    const { localStorageService } = LocalStorageFeature.resolve(container);

    const [value, setValue] = useState<T | undefined>(() => localStorageService.get<T>(key));

    useEffect(() => {
        const dispose = autorun(() => {
            const value = localStorageService.get<T>(key);
            setValue(value);
        });
        return () => dispose();
    }, [localStorageService, key]);

    return value;
}
