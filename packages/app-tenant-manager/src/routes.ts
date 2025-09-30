import { Route } from "@webiny/app-admin";

export const Routes = {
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
