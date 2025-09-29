import React, { useContext, useEffect, useMemo, useRef } from "react";
import type { History } from "history";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { HistoryRouterGateway } from "./HistoryRouterGateway";
import { RouterRepository } from "./RouterRepository";
import { Route } from "./Route";
import { type IRouterPresenter, RouterPresenter } from "./RouterPresenter";
import type { MatchedRoute } from "./abstractions/IRouterGateway";

export type ReactRoute = {
    route: Route<any>;
    element: JSX.Element;
};

interface RouterProps {
    getBaseUrl: () => string;
    history: History;
    routes?: ReactRoute[];
    children: JSX.Element;
}

interface MatchedRouteWithElement extends MatchedRoute {
    element: JSX.Element;
}

export interface RouterPresenterContext {
    route: MatchedRoute;
    goToRoute: IRouterPresenter["goToRoute"];
    setRouteParams: IRouterPresenter["setRouteParams"];
    getLink: IRouterPresenter["getLink"];
    onRouteExit: IRouterPresenter["onRouteExit"];
    setRoutes: (routes: ReactRoute[]) => void;
}

const RouteContext = React.createContext<MatchedRouteWithElement | undefined>(undefined);
export const RouterPresenterContext = React.createContext<RouterPresenterContext | undefined>(
    undefined
);

export const Router = observer(({ getBaseUrl, history, children, routes }: RouterProps) => {
    const baseUrl = getBaseUrl();

    const presenter = useMemo(() => {
        const gateway = new HistoryRouterGateway(history, baseUrl);
        const repository = new RouterRepository(gateway);
        return new RouterPresenter(repository);
    }, []);

    useEffect(() => {
        if (routes) {
            presenter.bootstrap(routes.map(route => route.route));
        }
        return () => {
            presenter.destroy();
        };
    }, []);

    const routesRef = useRef<ReactRoute[]>(routes ?? []);
    const { currentRoute } = presenter.vm;

    const route = currentRoute
        ? routesRef.current.find(route => route.route.name === currentRoute.name)
        : null;

    const routeContext: MatchedRouteWithElement | undefined = useMemo(() => {
        return route && currentRoute ? { ...currentRoute, element: route.element } : undefined;
    }, [route, currentRoute]);

    const presenterContext: RouterPresenterContext = useMemo(
        () => ({
            route: toJS(currentRoute)!,
            goToRoute: presenter.goToRoute,
            setRouteParams: presenter.setRouteParams,
            getLink: presenter.getLink,
            onRouteExit: presenter.onRouteExit,
            setRoutes: (routes: ReactRoute[]) => {
                routesRef.current = routes;

                presenter.bootstrap(routes.map(route => route.route));
            }
        }),
        [currentRoute]
    );

    return (
        <RouterPresenterContext.Provider value={presenterContext}>
            <RouteContext.Provider value={routeContext}>{children}</RouteContext.Provider>
        </RouterPresenterContext.Provider>
    );
});

export const RouteContent = observer(() => {
    const route = useContext(RouteContext);

    if (!route) {
        return null;
    }

    return <>{route.element}</>;
});
