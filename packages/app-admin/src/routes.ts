import { Route } from "@webiny/app-admin";

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
