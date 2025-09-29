import { makeAutoObservable, toJS } from "mobx";
import type { IRouterRepository } from "~/abstractions/IRouterRepository.js";
import type { MatchedRoute, OnRouteExit } from "~/abstractions/IRouterGateway.js";
import type { Route, RouteParamsDefinition, RouteParamsInfer } from "~/Route.js";

// Pulls out keys that are required
type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type RouteParamsArgs<TParams extends RouteParamsDefinition | undefined> =
    TParams extends RouteParamsDefinition
        ? RequiredKeys<RouteParamsInfer<TParams>> extends never
            ? [params?: RouteParamsInfer<TParams>] // all optional → param optional
            : [params: RouteParamsInfer<TParams>] // some required → param required
        : [];

interface RouterViewModel {
    currentRoute: MatchedRoute | undefined;
}

export interface IRouterPresenter {
    vm: RouterViewModel;
    bootstrap(routes: Route[]): void;
    goToRoute<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        ...args: RouteParamsArgs<TParams>
    ): void;
    getLink<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        ...args: RouteParamsArgs<TParams>
    ): string;
    setRouteParams<T extends Record<string, any>>(cb: (params: T) => T): void;
    onRouteExit(cb: OnRouteExit): void;
    destroy(): void;
}

export class RouterPresenter implements IRouterPresenter {
    private routerRepository: IRouterRepository;

    constructor(routerRepository: IRouterRepository) {
        this.routerRepository = routerRepository;

        makeAutoObservable(this);
    }

    get vm() {
        return {
            currentRoute: toJS(this.routerRepository.getMatchedRoute())
        };
    }

    bootstrap = (routes: Route[]) => {
        console.log("bootstrap", routes);
        this.routerRepository.registerRoutes(routes);
    };

    goToRoute = (route: any, params?: any) => {
        this.routerRepository.goToRoute(route.name, params);
    };

    setRouteParams = (cb: any) => {
        console.log("setRouteParams");
        const currentRoute = this.routerRepository.getCurrentRoute();
        if (!currentRoute) {
            return;
        }

        const matchedRoute = this.routerRepository.getMatchedRoute();
        const newParams = cb(matchedRoute?.params ?? {});
        this.goToRoute(currentRoute, newParams);
    };

    getLink = (route: any, params?: any) => {
        console.log("getLink", route.name);
        return this.routerRepository.getLink(route, params);
    };

    onRouteExit = (cb: OnRouteExit) => {
        this.routerRepository.onRouteExit(cb);
    };

    destroy = () => {
        this.routerRepository.destroy();
    };
}
