import type { z } from "zod";
import type { History } from "history";
import UniversalRouter, {
    RouterContext,
    RouteParams as UniversalRouteParams
} from "universal-router";
import generateUrls from "universal-router/generateUrls";
import type {
    MatchedRoute,
    IRouterGateway,
    RouteDefinition,
    OnRouteExit
} from "~/abstractions/IRouterGateway.js";

type RouteResolveResult = [MatchedRoute, RouteDefinition["onMatch"]];

interface RouteDefinitionWithAction extends RouteDefinition {
    action(context: RouterContext, params: UniversalRouteParams): RouteResolveResult;
}

export class HistoryRouterGateway implements IRouterGateway {
    private readonly history: History;
    private readonly routes: RouteDefinitionWithAction[] = [];
    private readonly router: UniversalRouter<RouteResolveResult>;
    private readonly urlGenerator: ReturnType<typeof generateUrls>;
    private stopListening: () => void;
    private unblock: (() => void) | undefined;

    constructor(history: History, baseUrl: string) {
        this.history = history;
        this.router = new UniversalRouter<RouteResolveResult>(this.routes, {
            baseUrl,
            resolveRoute: (context, params) => {
                if (!context.path) {
                    return context.next();
                }

                if (!context.route.action) {
                    return undefined;
                }

                return context.route.action(context, params);
            },
            errorHandler: () => undefined
        });

        this.urlGenerator = generateUrls(this.router, {
            stringifyQueryParams: (params: any) => {
                return new URLSearchParams(params as Record<string, any>).toString();
            }
        });

        this.stopListening = history.listen(async ({ location }) => {
            const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());
            this.resolvePathname(location.pathname, queryParams);
        });
    }

    onRouteExit(cb: OnRouteExit): void {
        this.guardRouteExit(cb);
    }

    goToRoute(name: string, params: z.ZodTypeAny): void {
        this.history.push(this.generateRouteUrl(name, params));
    }

    generateRouteUrl(id: string, params: any = {}): string {
        return this.urlGenerator(id, params);
    }

    setRoutes(routes: RouteDefinition[]) {
        this.routes.length = 0;

        routes.forEach(route => {
            this.routes.push(this.routeWithAction(route));
        });

        this.sortRoutes(this.routes);

        const queryParams = Object.fromEntries(
            new URLSearchParams(this.history.location.search).entries()
        );
        const currentPathname = this.history.location.pathname;
        this.resolvePathname(currentPathname, queryParams);
    }

    addRoute(route: RouteDefinition): void {
        this.routes.push(this.routeWithAction(route));
        this.sortRoutes(this.routes);
    }

    destroy(): void {
        this.stopListening();
        this.unblock && this.unblock();
    }

    private routeWithAction(route: RouteDefinition): RouteDefinitionWithAction {
        return {
            ...route,
            path: route.path === "*" ? "(.*)" : route.path,
            action: (context, params) => {
                const matchedRoute = {
                    name: route.name,
                    path: route.path,
                    pathname: context.pathname,
                    params: { ...params, ...context.queryParams }
                };

                const onMatch = async (matchedRoute: MatchedRoute) => {
                    route.onMatch(matchedRoute);
                };

                return [matchedRoute, onMatch];
            }
        };
    }

    private async resolvePathname(pathname: string, queryParams?: Record<string, unknown>) {
        const result = await this.router.resolve({ pathname, queryParams });
        if (!result) {
            return;
        }

        const [matchedRoute, onMatch] = result;

        onMatch(matchedRoute);
    }

    private sortRoutes(routes: RouteDefinition[]) {
        const INDEX_PATH = "/";
        const MATCH_ALL = "(.*)";

        routes.sort((a, b) => {
            const pathA = a.path || MATCH_ALL;
            const pathB = b.path || MATCH_ALL;

            // This will sort paths at the very bottom of the list
            if (pathA === INDEX_PATH && pathB === MATCH_ALL) {
                return -1;
            }

            // This will push * and / to the bottom of the list
            if (pathA === MATCH_ALL || pathA === INDEX_PATH) {
                return 1;
            }

            // This will push * and / to the bottom of the list
            if ([MATCH_ALL, INDEX_PATH].includes(pathB)) {
                return -1;
            }

            return 0;
        });
    }

    private guardRouteExit(onRouteExit: OnRouteExit): void {
        if (this.unblock) {
            // Remove existing blocker before installing a new one.
            this.unblock();
        }

        this.unblock = this.history.block(tx => {
            let resolved = false;

            onRouteExit({
                continue: () => {
                    if (!resolved) {
                        resolved = true;
                        // We need to unblock the transition before retying.
                        if (this.unblock) {
                            this.unblock();
                            this.unblock = undefined;
                        }
                        // Perform transition.
                        tx.retry();
                    }
                },
                cancel: () => {
                    resolved = true;
                    // Do nothing.
                }
            });

            // Block the transition until `continue` is called.
            return false;
        });
    }
}
