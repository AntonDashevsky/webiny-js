import React, { useEffect } from "react";
import { useRouter, RouteContent, type ReactRoute } from "@webiny/react-router";

interface RoutesProps {
    routes: ReactRoute[];
}

export const Routes = (props: RoutesProps) => {
    const { setRoutes } = useRouter();

    useEffect(() => {
        const routes = props.routes.sort((a, b) => {
            const pathA: string = a.route.path || "*";
            const pathB: string = b.route.path || "*";

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

        setRoutes(routes);
    }, [props.routes.length]);

    return <RouteContent />;
};
