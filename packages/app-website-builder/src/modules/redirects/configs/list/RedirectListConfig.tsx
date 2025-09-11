import React, { useMemo } from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { CompositionScope } from "@webiny/react-composition";
import { Browser, type BrowserConfig } from "./Browser/index.js";

const base = createConfigurableComponent<RedirectListConfig>("WbRedirectListConfig");

const ScopedRedirectListConfig = ({ children }: { children: React.ReactNode }) => {
    return (
        <CompositionScope name={"wbRedirect"}>
            <base.Config>{children}</base.Config>
        </CompositionScope>
    );
};

ScopedRedirectListConfig.displayName = "WbRedirectListConfig";

export const RedirectListConfig = Object.assign(ScopedRedirectListConfig, { Browser });
export const RedirectListWithConfig = base.WithConfig;

interface RedirectListConfig {
    browser: BrowserConfig;
}

export function useRedirectListConfig() {
    const config = base.useConfig();

    const browser = config.browser || {};

    return useMemo(
        () => ({
            browser: {
                ...browser,
                bulkActions: [...(browser.bulkActions || [])],
                filters: [...(browser.filters || [])],
                filtersToWhere: [...(browser.filtersToWhere || [])]
            }
        }),
        [config]
    );
}
