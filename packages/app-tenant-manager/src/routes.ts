import { Route } from "@webiny/react-router";

export const Routes = {
    Domains: {},
    Tenants: {
        List: new Route({
            name: "TenantManager/Tenants/List",
            path: "/tenants",
            params: z => {
                return {
                    id: z.string().optional(),
                    new: z.boolean().optional()
                };
            }
        })
    }
};
