export interface RouteDefinition {
    name: string;
    path: string;
    onMatch(route: MatchedRoute): void;
}

export interface MatchedRoute<TParams = Record<string, any>> {
    // Name of the matched route.
    name: string;
    // Pathname that was used to match the route.
    pathname: string;
    // Path pattern that matched this route.
    path: string;
    // Route params extracted from the pathname.
    params: TParams;
}

export type TransitionController = {
    continue: () => void;
    cancel: () => void;
};

export interface OnRouteExit {
    (controller: TransitionController): void;
}

export interface IRouterGateway {
    registerRoutes(routes: RouteDefinition[]): void;
    goToRoute(name: string, params?: { [k: string]: any }): void;
    generateRouteUrl(id: string, params?: { [k: string]: any }): string;
    onRouteExit(cb: OnRouteExit): void;
    destroy(): void;
}
