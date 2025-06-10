import type React from "react";
import { useContext } from "react";
import {
    BrowserRouter as RBrowserRouter,
    type BrowserRouterProps,
    UNSAFE_RouteContext as __RouterContext,
    useLocation,
    useParams,
    useSearchParams
} from "react-router-dom";
import { StaticRouter as RStaticRouter, type StaticRouterProps } from "react-router-dom/server.js";
/**
 * Webiny enhancements and backwards compatibility with react-router v5.
 */
import { useHistory, type UseHistory } from "~/useHistory.js";
import { type RouteProps } from "./Route.js";

/**
 * Re-export types from react-router-dom.
 */
export type {
    // "react-router" types
    Hash,
    Location,
    Path,
    To,
    MemoryRouterProps,
    NavigateFunction,
    NavigateOptions,
    NavigateProps,
    Navigator,
    OutletProps,
    Params,
    PathMatch,
    RouteMatch,
    RouteObject,
    PathRouteProps,
    LayoutRouteProps,
    IndexRouteProps,
    RouterProps,
    Pathname,
    Search,
    // "react-router-dom" types
    ParamKeyValuePair,
    URLSearchParamsInit
} from "react-router-dom";

export * from "react-router-dom";

export { Link } from "./Link.js";
export type { LinkProps } from "./Link.js";

export { Route } from "./Route.js";
export type { RouteProps } from "./Route.js";

export { Prompt } from "./Prompt.js";
export type { PromptProps } from "./Prompt.js";

export { Routes } from "./Routes.js";
export { Routes as Switch } from "./Routes.js";
export type { RoutesProps } from "./Routes.js";

export { useHistory } from "./useHistory.js";
export type { UseHistory } from "./useHistory.js";

export { usePrompt } from "./usePrompt.js";

export type UseRouter = RouteProps & {
    history: UseHistory;
    location: ReturnType<typeof useLocation>;
    params: Record<string, any>;
    search: ReturnType<typeof useSearchParams>;
};

export function useRouter(): UseRouter {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const search = useSearchParams();
    return {
        ...useContext(__RouterContext),
        history,
        search,
        location,
        params
    };
}

/**
 * For Webiny, we only need a BrowserRouter, and we also export a StaticRouter, if we ever
 * need to do SSR. Right now, StaticRouter is not being used at all.
 */
export const BrowserRouter: React.ComponentType<BrowserRouterProps> = RBrowserRouter;
export type { BrowserRouterProps };

export const StaticRouter: React.ComponentType<StaticRouterProps> = RStaticRouter;
