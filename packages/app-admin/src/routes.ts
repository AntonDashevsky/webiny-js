import { Route } from "@webiny/app/router.js";

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
