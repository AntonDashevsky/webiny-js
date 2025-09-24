import { makeAutoObservable, toJS } from "mobx";
import type { IRouterRepository } from "~/abstractions/IRouterRepository.js";
import type { MatchedRoute, OnRouteExit } from "~/abstractions/IRouterGateway.js";
import type { Route, RouteParamsDefinition, RouteParamsInfer } from "~/Route.js";

interface RouterViewModel {
    currentRoute: MatchedRoute | undefined;
}

export interface IRouterPresenter {
    vm: RouterViewModel;
    bootstrap(routes: Route[]): void;
    goToRoute<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ): void;
    getLink<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ): string;
    onRouteExit(cb: OnRouteExit): void;
    destroy(): void;
}

export class RouterPresenter implements IRouterPresenter {
    private routerRepository: IRouterRepository;

    constructor(routerRepository: IRouterRepository) {
        this.routerRepository = routerRepository;

        this.goToRoute = this.goToRoute.bind(this);
        makeAutoObservable(this);
    }

    get vm() {
        return {
            currentRoute: toJS(this.routerRepository.getCurrentRoute())
        };
    }

    bootstrap = (routes: Route[]) => {
        this.routerRepository.registerRoutes(routes);
    };

    goToRoute<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ) {
        this.routerRepository.goToRoute(route, params);
    }

    getLink<TParams extends RouteParamsDefinition | undefined>(
        route: Route<TParams>,
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    ) {
        return this.routerRepository.getLink(route, params);
    }

    onRouteExit = (cb: OnRouteExit) => {
        this.routerRepository.onRouteExit(cb);
    };

    destroy() {
        this.routerRepository.destroy();
    }
}
