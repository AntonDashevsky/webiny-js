import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import type { Route, RouteParamsDefinition, RouteParamsInfer } from "./Route.js";
import { useRouter } from "./useRouter.js";
import { SimpleLink } from "./SimpleLink.js";

type BaseAnchorAttributes = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

// The props are generic over the Route's schema.
export type RouteLinkProps<TParams extends RouteParamsDefinition | undefined = undefined> =
    BaseAnchorAttributes & {
        route: Route<TParams>;
        params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined;
    };

export const RouteLink = makeDecoratable(
    "RouteLink",
    <TParams extends RouteParamsDefinition | undefined = undefined>({
        children,
        route,
        params,
        ...rest
    }: RouteLinkProps<TParams>) => {
        const router = useRouter();

        const href = router.getLink(
            route!,
            params as TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined
        );

        return (
            <SimpleLink to={href} {...rest}>
                {children}
            </SimpleLink>
        );
    }
);
