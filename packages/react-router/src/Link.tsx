import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import type { Route, RouteParamsDefinition, RouteParamsInfer } from "~/Route.js";
import { useRouter } from "~/useRouter.js";

type BaseAnchorAttributes = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

// The props are generic over the Route's schema.
export type LinkProps<TParams extends RouteParamsDefinition | undefined = undefined> =
    | (BaseAnchorAttributes & {
          to: string;
          route?: never;
          params?: never;
      })
    | (BaseAnchorAttributes & {
          route: Route<TParams>;
          params: TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined;
          to?: never;
      });

export const Link = makeDecoratable(
    "Link",
    <TParams extends RouteParamsDefinition | undefined = undefined>({
        children,
        to,
        route,
        params,
        ...rest
    }: LinkProps<TParams>) => {
        const router = useRouter();
        const href = to
            ? to
            : router.getLink(
                  route!,
                  params as TParams extends RouteParamsDefinition
                      ? RouteParamsInfer<TParams>
                      : undefined
              );

        return (
            <a href={href} rel="noreferrer noopener" {...rest}>
                {children}
            </a>
        );
    }
);
