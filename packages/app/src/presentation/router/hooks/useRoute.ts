import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import type { Route, RouteParamsDefinition, RouteParamsInfer } from "~/features/router/Route.js";
import { MatchedRoute, RouterPresenter } from "~/features/router/abstractions.js";
import { useContainer } from "~/di/DiContainerProvider.js";

export function useRoute<TParams extends RouteParamsDefinition | undefined = undefined>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route?: Route<TParams>
) {
    const container = useContainer();
    const presenter = useMemo(() => container.resolve(RouterPresenter), []);
    const [currentRoute, setCurrentRoute] = useState<MatchedRoute | undefined>(
        presenter.vm.currentRoute
    );

    useEffect(() => {
        autorun(() => {
            const route = presenter.vm.currentRoute;

            if (!route) {
                return;
            }

            setCurrentRoute(route);
        });
    }, []);

    // TODO: add validation (the requested route must match  the current route)

    return {
        route: currentRoute as MatchedRoute<
            TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
        >,
        setRouteParams: presenter.setRouteParams.bind(presenter)
    };
}
