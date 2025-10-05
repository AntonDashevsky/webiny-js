import { type ReactRoute, RouteElementRegistry } from "~/presentation/router/index.js";
import { useContainer } from "~/di/DiContainerProvider.js";
import { useFeature } from "~/di/useFeature.js";
import { RouterFeature } from "~/features/router/index.js";

export const useRouter = () => {
    const { presenter } = useFeature(RouterFeature);
    const container = useContainer();
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
