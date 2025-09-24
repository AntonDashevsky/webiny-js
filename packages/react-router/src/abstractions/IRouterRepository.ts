import type { Route, RouteParamsDefinition, RouteParamsInfer } from "~/Route.js";
import type { MatchedRoute, OnRouteExit } from "~/abstractions/IRouterGateway.js";

export interface IRouterRepository {
    onRouteExit(cb: OnRouteExit): void;

    getCurrentRoute(): MatchedRoute | undefined;

    goToRoute<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ): void;

    getLink<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ): string;

    registerRoutes(routes: Route[]): void;

    destroy(): void;
}
