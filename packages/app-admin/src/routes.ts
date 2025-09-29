import { Route } from "@webiny/react-router";

export const Routes = {
    Dashboard: new Route({
        name: "Dashboard",
        path: "/"
    }),

    CatchAll: new Route({
        name: "CatchAll",
        path: "*"
    })
};
