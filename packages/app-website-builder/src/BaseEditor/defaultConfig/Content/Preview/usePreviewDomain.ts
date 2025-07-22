import { useCallback, useEffect, useState } from "react";
import { useGetWebsiteBuilderSettings } from "~/features";
import { useSubscribeToLocalStorage } from "./useSubscribeToLocalStorage";

const CUSTOM_PREVIEW_DOMAIN = "webiny_wb_custom_preview_domain";

/**
 * This hook loads preview domain from settings, and also takes into account the override
 * via localstorage, which is a developers-only feature.
 */
export const usePreviewDomain = () => {
    const [previewDomain, setDomainFromSettings] = useState<string>("");

    const [customDomain, setCustomDomain] = useState(() =>
        window.localStorage.getItem(CUSTOM_PREVIEW_DOMAIN)
    );

    const localStorage = useSubscribeToLocalStorage(CUSTOM_PREVIEW_DOMAIN, newValue => {
        setCustomDomain(newValue);
    });

    const setPreviewDomain = useCallback((domain: string) => {
        localStorage.set(domain);
    }, []);

    const unsetPreviewDomain = useCallback(() => {
        localStorage.unset();
    }, []);

    const { getSettings } = useGetWebsiteBuilderSettings();

    useEffect(() => {
        getSettings().then(settings => {
            setDomainFromSettings(settings.previewDomain ?? "http://localhost:3000");
        });
    }, []);

    return {
        previewDomain: customDomain ?? previewDomain,
        setPreviewDomain,
        unsetPreviewDomain,
        isOverridden: customDomain !== null
    };
};
