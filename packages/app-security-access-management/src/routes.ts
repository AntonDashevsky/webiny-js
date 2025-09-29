import { Route } from "@webiny/react-router";

export const Routes = {
    Roles: {
        List: new Route({
            name: "Security/Roles/List",
            path: "/access-management/roles",
            params: z => {
                return {
                    id: z.string().optional(),
                    new: z.boolean().optional()
                };
            }
        })
    },
    Teams: {
        List: new Route({
            name: "Security/Roles/List",
            path: "/access-management/teams",
            params: z => {
                return {
                    id: z.string().optional(),
                    new: z.boolean().optional()
                };
            }
        })
    },
    ApiKeys: {
        List: new Route({
            name: "Security/Roles/List",
            path: "/access-management/api-keys",
            params: z => {
                return {
                    id: z.string().optional(),
                    new: z.boolean().optional()
                };
            }
        })
    }
};
