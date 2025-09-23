import React, { type FunctionComponentElement, useEffect } from "react";
import {
    type RouteProps,
    useRouter,
    RouteContent,
    type RouteDefinition
} from "@webiny/react-router";

type RouteDefinitions = RouteDefinition[];

const normalizeRoutes = (routes: FunctionComponentElement<RouteProps>[]): RouteDefinitions => {
    return routes.filter(Boolean).map(route => {
        return {
            name: route.props.name ?? route.props.path,
            path: route.props.path,
            element: route.props.element || route.props.children || route.props.render
        };
    }) as RouteDefinitions;
};

interface RoutesProps {
    routes: JSX.Element[];
}

export const Routes = (props: RoutesProps) => {
    const { setRoutes } = useRouter();

    // TODO: kroz useMemo?
    useEffect(() => {
        const routes = props.routes.sort((a, b) => {
            const pathA = a.props.path || "*";
            const pathB = b.props.path || "*";

            // This will sort paths at the very bottom of the list
            if (pathA === "/" && pathB === "*") {
                return -1;
            }

            // This will push * and / to the bottom of the list
            if (pathA === "*" || pathA === "/") {
                return 1;
            }

            // This will push * and / to the bottom of the list
            if (["*", "/"].includes(pathB)) {
                return -1;
            }

            return 0;
        });

        setRoutes(normalizeRoutes(routes));
    }, [props.routes.length]);

    return <RouteContent />;
};
