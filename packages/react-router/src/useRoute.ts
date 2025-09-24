import type { Route, RouteParamsDefinition, RouteParamsInfer } from "./Route";
import { useRouter } from "./useRouter.js";
import type { MatchedRoute } from "~/abstractions/IRouterGateway.js";

export function useRoute<TParams extends RouteParamsDefinition | undefined = undefined>(
    route: Route<TParams>
) {
    const router = useRouter();
    // TODO: add validation (the requested route must match  the current route)
    return router.route as MatchedRoute<
        TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
    >;
}
