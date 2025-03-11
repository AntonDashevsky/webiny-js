import { createConfigurableComponent } from "@webiny/react-properties";
import { Route, type RouteConfig } from "./RouterConfig/Route";
import { withStaticProps } from "~/utils";

const base = createConfigurableComponent<RouterConfig>("RouterConfig");

export const RouterWithConfig = Object.assign(base.WithConfig, {
    displayName: "RouterWithConfig"
});

interface RouterConfig {
    routes: RouteConfig[];
}

export const RouterConfig = withStaticProps(base.Config, {
    Route,
    use: base.useConfig
});
