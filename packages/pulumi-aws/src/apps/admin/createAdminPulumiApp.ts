import { CorePulumiApp, createReactPulumiApp } from "~/apps/index.js";
import { getProjectSdk } from "@webiny/project";
import { AdminPulumi } from "@webiny/project/abstractions";

export type AdminPulumiApp = ReturnType<typeof createReactPulumiApp>;

export const createAdminPulumiApp = async () => {
    const sdk = await getProjectSdk();
    return createReactPulumiApp({
        name: "admin",
        folder: "apps/admin",
        domains: undefined,
        pulumi: async app => {
            // Overrides must be applied via a handler, registered at the very start of the program.
            // By doing this, we're ensuring user's adjustments are not applied to late.
            const pulumiHandlers = sdk.getContainer().resolve(AdminPulumi);

            app.addHandler(() => {
                return pulumiHandlers.execute(app as unknown as CorePulumiApp);
            });
        }
    });
};
