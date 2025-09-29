import { makeAutoObservable, runInAction } from "mobx";
import type {
    MatchedRoute,
    RouteDefinition as GatewayRouteDefinition,
    IRouterGateway,
    OnRouteExit
} from "~/abstractions/IRouterGateway.js";
import type { IRouterRepository } from "~/abstractions/IRouterRepository.js";
import { Route, RouteParamsDefinition, RouteParamsInfer } from "~/Route.js";

const INIT_ROUTE = { name: "__init__", path: "", pathname: "", params: {} };

export class RouterRepository implements IRouterRepository {
    private gateway: IRouterGateway;
    private currentRoute: MatchedRoute = INIT_ROUTE;
    private routes: Route<any>[] = [];

    constructor(gateway: IRouterGateway) {
        this.gateway = gateway;

        makeAutoObservable(this);
    }

    getMatchedRoute() {
        return this.currentRoute.name !== INIT_ROUTE.name ? this.currentRoute : undefined;
    }

    getCurrentRoute(): Route<any> | undefined {
        return this.routes.find(route => route.name === this.currentRoute.name);
    }

    registerRoutes = (routes: Route[]) => {
        this.routes = routes;
        const routesWithAction = routes.map<GatewayRouteDefinition>(this.routeWithAction);

        this.gateway.setRoutes(routesWithAction);
    };

    getLink<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params?: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ): string {
        const routeExists = this.routes.find(existingRoute => existingRoute.name === route.name);
        if (!routeExists) {
            this.gateway.addRoute(this.routeWithAction(route));
            this.routes.push(route);
        }
        return this.gateway.generateRouteUrl(route.name, params);
    }

    goToRoute<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ): void {
        this.gateway.goToRoute(route.name, params);
    }

    onRouteExit(cb: OnRouteExit): void {
        this.gateway.onRouteExit(cb);
    }

    destroy() {
        this.gateway.destroy();
    }

    private routeWithAction = (route: Route<any>) => {
        return {
            name: route.name,
            path: route.path,
            onMatch: this.transitionToRoute.bind(this)
        };
    };

    private async transitionToRoute(route: MatchedRoute) {
        runInAction(() => {
            Object.assign(this.currentRoute, route);
        });
    }
}
