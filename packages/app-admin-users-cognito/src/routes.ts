import { Route } from "@webiny/app/router.js";

export const Routes = {
    Users: {
        List: new Route({
            name: "Cognito/Users/List",
            path: "/admin-users",
            params: z => {
                return {
                    id: z.string().optional(),
                    new: z.boolean().optional()
                };
            }
        }),
        Account: new Route({
            name: "Cognito/Users/Account",
            path: "/account"
        })
    }
};
