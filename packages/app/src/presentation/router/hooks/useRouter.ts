import { useMemo } from "react";
import { RouterPresenter } from "~/features/router/abstractions.js";
import { type ReactRoute, RouteElementRegistry } from "~/presentation/router/index.js";
import { useContainer } from "~/di/DiContainerProvider.js";

export const useRouter = () => {
    const container = useContainer();
    const presenter = useMemo(() => container.resolve(RouterPresenter), []);
    const registry = container.resolve(RouteElementRegistry);

    return {
        goToRoute: presenter.goToRoute.bind(presenter),
        getLink: presenter.getLink.bind(presenter),
        onRouteExit: presenter.onRouteExit.bind(presenter),
        setRoutes: (routes: ReactRoute[]) => {
            const cleanRoutes = [];

            for (const route of routes) {
                cleanRoutes.push(route.route);
                registry.register(route.route.name, route.element);
            }

            presenter.bootstrap(cleanRoutes);
        }
    };
};
